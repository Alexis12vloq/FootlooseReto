import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UsuarioRoles } from './UsuarioRoles.entity';

@Entity()
export class Usuarios {
    @PrimaryGeneratedColumn()
    id_usuario: number;

    @Column()
    nombre_usuario: string;

    @Column()
    contraseña: string;

    @Column()
    correo_electronico: string;

    // Relación uno a muchos con UsuarioRoles
    @OneToMany(() => UsuarioRoles, usuarioRol => usuarioRol.usuario)
    usuarioRoles: UsuarioRoles[];
}
