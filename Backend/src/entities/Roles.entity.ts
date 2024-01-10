import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UsuarioRoles } from './UsuarioRoles.entity';
import { RolPermisos } from './RolPermisos.entity';

@Entity()
export class Roles {
    @PrimaryGeneratedColumn()
    id_rol: number;

    @Column()
    nombre_rol: string;

    // Relación uno a muchos con UsuarioRoles
    @OneToMany(() => UsuarioRoles, usuarioRol => usuarioRol.rol)
    usuarioRoles: UsuarioRoles[];

    // Relación uno a muchos con RolPermisos
    @OneToMany(() => RolPermisos, rolPermiso => rolPermiso.rol)
    rolPermisos: RolPermisos[];
}
