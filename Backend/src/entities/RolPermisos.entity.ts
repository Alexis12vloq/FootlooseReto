import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Roles } from './Roles.entity';
import { Permisos } from './Permisos.entity';

@Entity()
export class RolPermisos {
    @PrimaryGeneratedColumn()
    id_rol_permiso: number;

    @ManyToOne(() => Roles, rol => rol.rolPermisos)
    @JoinColumn({ name: 'id_rol' })
    rol: Roles;

    @ManyToOne(() => Permisos, permiso => permiso.rolPermisos)
    @JoinColumn({ name: 'id_permiso' })
    permiso: Permisos;
}
