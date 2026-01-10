import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  async create(@Body() createClientDto: CreateClientDto) {
    const client = await this.clientService.create(createClientDto);
    return {
      ...client, 
      message: 'Cliente criado com sucesso!',
    };
  }

  @Get()
  async findAll() {
    return await this.clientService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.clientService.findOne(String(id));
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    const updatedClient = await this.clientService.update(
      String(id),
      updateClientDto,
    );
    return {
      ...updatedClient,
      message: 'Cliente atualizado com sucesso!',
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.clientService.remove(String(id));
    return { message: 'Cliente excluído com sucesso!' };
  }
}
