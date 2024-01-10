import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Producto } from './Producto.entity';

@Entity()
export class Modelo {
    @PrimaryGeneratedColumn()
    idModelo: number;

    @Column()
    NombreModelo: string;

    @OneToMany(() => Producto, (producto) => producto.Modelo)
    productos: Producto[];
}
