import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Producto } from './Producto.entity';

@Entity()
export class Marca {
    @PrimaryGeneratedColumn()
    idMarca: number;

    @Column()
    NombreMarca: string;

    @OneToMany(() => Producto, (producto) => producto.Marca)
    productos: Producto[];
}
