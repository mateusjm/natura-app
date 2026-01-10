import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwt: JwtService,
  ) {}

  async register(data: RegisterDto) {
    const hashed = await bcrypt.hash(data.password, 10);

    const { confirmPassword, ...rest } = data;

    const user = await this.userService.create({
      ...rest,
      password: hashed,
    });

    return { id: user.id, email: user.email };
  }

  async login(data: LoginDto) {
    const user = await this.userService.findByEmail(data.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValid = await bcrypt.compare(data.password, user.password);

    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = await this.jwt.signAsync({
      sub: user.id,
      email: user.email,
    });

    return {
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  async me(userId: string) {
    const user = await this.userService.findOne(userId);
    if (!user) throw new UnauthorizedException('User not found');
    return { id: user.id, email: user.email, name: user.name };
  }

  async update(userId: string, data: UpdateUserDto) {
    const user = await this.userService.findOne(userId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    let updatedData = { ...data };

    if (data.password) {
      updatedData.password = await bcrypt.hash(data.password, 10);
    }

    const updatedUser = await this.userService.update(userId, updatedData);

    return {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
    };
  }
}
