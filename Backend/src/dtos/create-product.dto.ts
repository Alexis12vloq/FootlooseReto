// src/dtos/create-product.dto.ts

import { IsNotEmpty, IsString, IsNumber, IsPositive } from 'class-validator';

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    NombreProducto: string;

    @IsNotEmpty()
    @IsNumber()
    idMarca: number;

    @IsNotEmpty()
    @IsNumber()
    idModelo: number;

    @IsNotEmpty()
    @IsNumber()
    idColor: number;

    @IsNotEmpty()
    @IsNumber()
    idTalla: number;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    PrecioVenta: number;
}
