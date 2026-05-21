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

  create(data: CreateClientDto, userId: string) {
    const client = this.clientRepository.create({ ...data, userId });
    return this.clientRepository.save(client);
  }

  findAll(userId: string) {
    return this.clientRepository.find({ where: { userId } });
  }

  async findOne(id: string, userId: string) {
    const client = await this.clientRepository.findOne({ where: { id, userId } });
    if (!client) {
      throw new NotFoundException('Cliente não encontrado');
    }

    return client;
  }

  async update(id: string, updateClientDto: UpdateClientDto, userId: string) {
    const client = await this.findOne(id, userId);
    Object.assign(client, updateClientDto);
    return this.clientRepository.save(client);
  }

  async remove(id: string, userId: string) {
    const product = await this.findOne(id, userId);
    await this.clientRepository.delete({ id, userId });
    return product;
  }
}
