// auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { Usuarios } from '../entities/usuarios.entity';
import { UsuarioRepository } from '../repositories/usuario.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioRoles } from 'src/entities/UsuarioRoles.entity';
import { Roles } from 'src/entities/Roles.entity';

interface Body {
    username: string;
    password: string;
}
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Usuarios)
        private usuarioRepository: Repository<Usuarios>,
        @InjectRepository(UsuarioRoles)
        private usuarioRolesRepository: Repository<UsuarioRoles>,
        @InjectRepository(Roles)
        private rolesRepository: Repository<Roles>,
    ) { }

    async validateUser(username: string, password: string): Promise<Roles | Usuarios | string | object> {
        const user = await this.usuarioRepository.findOne({ where: { nombre_usuario: username } });
        if (!user) {
            return 'Usuario no encontrado';
        }
        console.log(password);
        if (user.contraseña !== password) {
            return 'Contraseña incorrecta';
        }
        const userRoles = await this.usuarioRolesRepository.findOne({ where: { usuario: user } });
        const roles = await this.rolesRepository.findOne({ where: { usuarioRoles: userRoles } });
        delete user.contraseña;
        return { user, roles };
    }
}
