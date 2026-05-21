import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { JwtPayload } from '../auth/interfaces/jwt-payload.interface';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    if (id !== user.sub) {
      throw new ForbiddenException('Acesso negado');
    }
    return this.userService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: UpdateUserDto,
    @CurrentUser() user: JwtPayload,
  ) {
    if (id !== user.sub) {
      throw new ForbiddenException('Acesso negado');
    }
    return this.userService.update(id, data);
  }
}
