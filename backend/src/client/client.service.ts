import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  create(data: CreateClientDto) {
    const client = this.clientRepository.create(data);
    return this.clientRepository.save(client);
  }

  findAll() {
    return this.clientRepository.find();
  }

  async findOne(id: string) {
    const client = await this.clientRepository.findOne({ where: { id } });
    if (!client) {
      throw new NotFoundException('Cliente não encontrado');
    }

    return client;
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    const client = await this.findOne(id);
    Object.assign(client, updateClientDto);
    return this.clientRepository.save(client);
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    await this.clientRepository.delete(id);
    return product;
  }
}
