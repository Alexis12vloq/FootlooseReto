import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Usuarios } from './Usuarios.entity';
import { Roles } from './Roles.entity';

@Entity()
export class UsuarioRoles {
  @PrimaryGeneratedColumn()
  id_usuario_rol: number;

  @ManyToOne(() => Usuarios, usuario => usuario.usuarioRoles)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuarios;

  @ManyToOne(() => Roles, rol => rol.usuarioRoles)
  @JoinColumn({ name: 'id_rol' })
  rol: Roles;
}
