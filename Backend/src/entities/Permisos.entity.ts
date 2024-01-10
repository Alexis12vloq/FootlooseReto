import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RolPermisos } from './RolPermisos.entity';

@Entity()
export class Permisos {
    @PrimaryGeneratedColumn()
    id_permiso: number;

    @Column()
    nombre_permiso: string;

    // Relación uno a muchos con RolPermisos
    @OneToMany(() => RolPermisos, rolPermiso => rolPermiso.permiso)
    rolPermisos: RolPermisos[];
}
