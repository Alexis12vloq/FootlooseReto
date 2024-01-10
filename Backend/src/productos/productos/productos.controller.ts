import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { Producto } from '../../entities/Producto.entity';
import { CreateProductDto } from 'src/dtos/create-product.dto';
import { EditProductDto } from 'src/dtos/edit-product.dto';
import { ProductDetailsDto } from 'src/dtos/details-product';
import * as PDFDocument from 'pdfkit';
import flatted, { parse } from 'flatted';
import * as CircularJSON from 'circular-json';

import { Response } from 'express';
@Controller('productos')
export class ProductosController {
    constructor(private readonly productosService: ProductosService) { }

    @Get()
    findAll(): Promise<Producto[]> {
        return this.productosService.findAll();
    }

    @Post('created')
    async createProduct(@Body() createProductDto: CreateProductDto) {
        console.log(createProductDto)
        const nuevoProducto = await this.productosService.createProduct(createProductDto);
        return nuevoProducto;
    }

    @Put(':id')
    async editarProducto(@Param('id') id: number, @Body() editProductDto: EditProductDto) {
        return this.productosService.editarProducto(id, editProductDto);
    }

    @Get('catalogo')
    async obtenerCatalogo() {
        return this.productosService.obtenerCatalogo();
    }

    @Delete(':id')
    async eliminarProducto(@Param('id') id: number): Promise<void | string> {
        return await this.productosService.eliminarProducto(id);
    }

    @Get(':id/pdf')
    async getProductDetailsPdf(@Param('id') productId: number, @Res() res: Response): Promise<void> {
        const productDetails: ProductDetailsDto = await this.productosService.getProductDetails(productId);

        const flattenedProductDetails = CircularJSON.stringify(productDetails);

        const parsedProductDetails: ProductDetailsDto = CircularJSON.parse(flattenedProductDetails);

        await this.productosService.generateProductDetailsPdf(parsedProductDetails);
        res.sendFile('product_details.pdf', { root: '.', headers: { 'Content-Type': 'application/pdf' } });

    }
}
