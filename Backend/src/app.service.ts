import { Injectable } from '@nestjs/common';
import { Usuarios } from './entities/Usuarios.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Usuarios)
    private usuarioRepository: Repository<Usuarios>,
  ) { }
  async findAll(): Promise<Usuarios[]> {
    return this.usuarioRepository.find();
  }
}
