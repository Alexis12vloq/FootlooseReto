import { Module } from '@nestjs/common';
import { ProductosService } from './productos/productos.service';
import { ProductosController } from './productos/productos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from 'src/entities/Producto.entity';
import { Marca } from 'src/entities/Marca.entity';
import { Modelo } from 'src/entities/Modelo.entity';
import { Color } from 'src/entities/Color.entity';
import { Talla } from 'src/entities/Talla.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Producto, Marca, Modelo, Color, Talla])],
  providers: [ProductosService],
  controllers: [ProductosController]
})
export class ProductosModule { }
