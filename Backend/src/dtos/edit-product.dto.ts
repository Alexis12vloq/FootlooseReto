// edit-product.dto.ts

import { IsNotEmpty, IsNumber, IsPositive, IsOptional, IsString } from 'class-validator';

export class EditProductDto {
    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    idProducto?: number;

    @IsNotEmpty()
    @IsString()
    NombreProducto: string;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    idMarca?: number;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    idModelo?: number;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    idColor?: number;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    idTalla?: number;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    PrecioVenta?: number;

    @IsOptional()
    @IsNotEmpty()
    imagen?: string;

    // Puedes agregar otros campos según sea necesario
}
