import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from '../../entities/Producto.entity';
import { CreateProductDto } from 'src/dtos/create-product.dto';
import { Marca } from 'src/entities/Marca.entity';
import { Modelo } from 'src/entities/Modelo.entity';
import { Color } from 'src/entities/Color.entity';
import { Talla } from 'src/entities/Talla.entity';
import { EditProductDto } from 'src/dtos/edit-product.dto';
import { ProductDetailsDto } from 'src/dtos/details-product';
import { createWriteStream } from 'fs';
import * as PDFDocument from 'pdfkit';
@Injectable()
export class ProductosService {
    constructor(
        @InjectRepository(Producto)
        private readonly productoRepository: Repository<Producto>,
        @InjectRepository(Marca) private readonly marcaRepository: Repository<Marca>,
        @InjectRepository(Modelo) private readonly modeloRepository: Repository<Modelo>,
        @InjectRepository(Color) private readonly colorRepository: Repository<Color>,
        @InjectRepository(Talla) private readonly tallaRepository: Repository<Talla>,
    ) { }

    async findAll(): Promise<Producto[]> {
        return this.productoRepository.find({
            relations: ['Marca', 'Modelo', 'Color', 'Talla'],
        });
    }
    async createProduct(createProductDto: CreateProductDto): Promise<Producto> {
        const { NombreProducto, idMarca, idModelo, idColor, idTalla, PrecioVenta } = createProductDto;

        const producto = this.productoRepository.create({
            NombreProducto,
            Marca: { idMarca },
            Modelo: { idModelo },
            Color: { idColor },
            Talla: { idTalla },
            imagen: 'https://juntozstgsrvproduction.blob.core.windows.net/default-blob-images/orig_logo_%2061902.jpg?w=450&h=450',
            PrecioVenta,
        });

        return this.productoRepository.save(producto);
    }
    async editarProducto(id: number, editProductDto: EditProductDto) {
        console.log(editProductDto)
        const productoEditado = await this.productoRepository.update(id, {
            NombreProducto: editProductDto.NombreProducto,
            Marca: { idMarca: editProductDto.idMarca },
            Modelo: { idModelo: editProductDto.idModelo },
            Color: { idColor: editProductDto.idColor },
            Talla: { idTalla: editProductDto.idTalla },
            imagen: 'https://juntozstgsrvproduction.blob.core.windows.net/default-blob-images/orig_logo_%2061902.jpg?w=450&h=450',
            PrecioVenta: editProductDto.PrecioVenta,
        });

        return productoEditado;
    }
    async obtenerCatalogo(): Promise<any> {
        const marcas = await this.marcaRepository.find();
        const modelos = await this.modeloRepository.find();
        const colores = await this.colorRepository.find();
        const tallas = await this.tallaRepository.find();
        return { marcas, modelos, colores, tallas };
    }

    async eliminarProducto(id: number): Promise<void | string> {
        const resultado = await this.productoRepository
            .createQueryBuilder()
            .delete()
            .from(Producto)
            .where("idProducto = :id", { id })
            .execute();

        if (resultado.affected === 0) {
            throw new NotFoundException(`Producto con id ${id} no encontrado`);
        }
        return `Producto ${id} Eliminado`
    }
    generateProductDetailsPdf(productDetails: ProductDetailsDto): void {
        const pdfStream = createWriteStream('product_details.pdf');
        const pdfDoc = new PDFDocument();

        pdfDoc.pipe(pdfStream);

        pdfDoc.fontSize(14).text(`Detalles del Producto: ${productDetails.nombre}`);
        pdfDoc.fontSize(12).text(`Marca: ${productDetails.marca}`);
        pdfDoc.fontSize(12).text(`Modelo: ${productDetails.modelo}`);
        pdfDoc.fontSize(12).text(`Color: ${productDetails.color}`);
        pdfDoc.fontSize(12).text(`Talla: ${productDetails.talla}`);
        pdfDoc.fontSize(12).text(`Precio de Venta: $${productDetails.precioVenta}`);

        pdfDoc.end();
        return pdfDoc;
    }
    async getProductDetails(id: number): Promise<ProductDetailsDto> {
        try {
            const producto: Producto = await this.productoRepository.findOne({
                where: { idProducto: id },
                relations: ['Marca', 'Modelo', 'Color', 'Talla'],
            });

            if (!producto) {
                throw new Error(`No se encontró un producto con ID ${id}`);
            }

            // Mapeo de datos al DTO de detalles del producto
            const productDetails: ProductDetailsDto = {
                nombre: producto.NombreProducto,
                marca: producto.Marca.NombreMarca,
                modelo: producto.Modelo.NombreModelo,
                color: producto.Color.NombreColor,
                talla: producto.Talla.NombreTalla,
                precioVenta: producto.PrecioVenta,
            };
            return productDetails;
        } catch (error) {
            throw new Error(`Error al obtener detalles del producto: ${error.message}`);
        }
    }
}
