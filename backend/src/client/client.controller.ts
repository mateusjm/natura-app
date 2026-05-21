import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { JwtPayload } from '../auth/interfaces/jwt-payload.interface';

@UseGuards(JwtAuthGuard)
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  async create(
    @Body() createClientDto: CreateClientDto,
    @CurrentUser() user: JwtPayload,
  ) {
    const client = await this.clientService.create(createClientDto, user.sub);
    return {
      ...client,
      message: 'Cliente criado com sucesso!',
    };
  }

  @Get()
  async findAll(@CurrentUser() user: JwtPayload) {
    return await this.clientService.findAll(user.sub);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return await this.clientService.findOne(String(id), user.sub);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
    @CurrentUser() user: JwtPayload,
  ) {
    const updatedClient = await this.clientService.update(
      String(id),
      updateClientDto,
      user.sub,
    );
    return {
      ...updatedClient,
      message: 'Cliente atualizado com sucesso!',
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    await this.clientService.remove(String(id), user.sub);
    return { message: 'Cliente excluído com sucesso!' };
  }
}
