import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Marca } from './Marca.entity';
import { Modelo } from './Modelo.entity';
import { Color } from './Color.entity';
import { Talla } from './Talla.entity';

@Entity()
export class Producto {
    @PrimaryGeneratedColumn()
    idProducto: number;

    @Column()
    NombreProducto: string;

    @ManyToOne(() => Marca, { eager: true })
    @JoinColumn({ name: 'idMarca' })
    Marca: Marca;

    @ManyToOne(() => Modelo, { eager: true })
    @JoinColumn({ name: 'idModelo' })
    Modelo: Modelo;

    @ManyToOne(() => Color, { eager: true })
    @JoinColumn({ name: 'idColor' })
    Color: Color;

    @ManyToOne(() => Talla, { eager: true })
    @JoinColumn({ name: 'idTalla' })
    Talla: Talla;

    @Column()
    imagen: string;

    @Column()
    PrecioVenta: number;
}
