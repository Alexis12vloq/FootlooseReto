import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Producto } from './Producto.entity';

@Entity()
export class Color {
    @PrimaryGeneratedColumn()
    idColor: number;

    @Column()
    NombreColor: string;

    @OneToMany(() => Producto, (producto) => producto.Color)
    productos: Producto[];
}
