import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Producto } from './Producto.entity';

@Entity()
export class Talla {
    @PrimaryGeneratedColumn()
    idTalla: number;

    @Column()
    NombreTalla: string;

    @OneToMany(() => Producto, (producto) => producto.Talla)
    productos: Producto[];
}
