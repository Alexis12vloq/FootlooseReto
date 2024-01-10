import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuarios } from './entities/Usuarios.entity';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { UsuarioRepository } from './repositories/usuario.repository';
import { AuthController } from './auth/auth.controller';
import { UsuarioRoles } from './entities/UsuarioRoles.entity';
import { Roles } from './entities/Roles.entity';
import { ProductosModule } from './productos/productos.module';
import { Producto } from './entities/Producto.entity';
import { ProductosController } from './productos/productos/productos.controller';
import { ProductosService } from './productos/productos/productos.service';
import { Marca } from './entities/Marca.entity';
import { Modelo } from './entities/Modelo.entity';
import { Color } from './entities/Color.entity';
import { Talla } from './entities/Talla.entity';
@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mssql',
    host: 'LAPTOP-R42C73H0',
    username: 'alexiss',
    password: 'root',
    database: 'footloose',
    synchronize: true,
    logging: true,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    extra: {
      encrypt: true,
      trustServerCertificate: true,
    },

  }),
  TypeOrmModule.forFeature([Usuarios, UsuarioRepository, UsuarioRoles, Roles, Producto, Marca, Modelo, Color, Talla]),
    AuthModule,
    ProductosModule],
  controllers: [AppController, AuthController, ProductosController],
  providers: [AppService, AuthService, ProductosService],
})
export class AppModule { }
