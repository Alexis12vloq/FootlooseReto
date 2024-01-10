// usuario.repository.ts
import { EntityRepository, Repository } from 'typeorm';
import { Usuarios } from '../entities/usuarios.entity';

@EntityRepository(Usuarios)
export class UsuarioRepository extends Repository<Usuarios> {
    // ...
}
