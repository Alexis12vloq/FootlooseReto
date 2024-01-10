import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsuarioRepository } from 'src/repositories/usuario.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuarios } from 'src/entities/Usuarios.entity';
import { UsuarioRoles } from 'src/entities/UsuarioRoles.entity';
import { Roles } from 'src/entities/Roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuarios, UsuarioRepository, UsuarioRoles, Roles])],
  providers: [AuthService, UsuarioRepository],
  controllers: [AuthController]
})
export class AuthModule { }
