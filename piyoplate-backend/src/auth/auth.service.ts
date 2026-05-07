import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(data: RegisterDto) {
    const existingUser = await this.prisma.users.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new BadRequestException('Email Already Exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.prisma.users.create({
      data: {
        ...data,
        password: hashedPassword,
      },
      select: { id: true, username: true, email: true }, // Jangan balikin password
    });
  }

  async login(data: LoginDto) {
    const user = await this.prisma.users.findUnique({
      where: { email: data.email },
    });

    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      throw new UnauthorizedException('Email atau password salah');
    }

    return {
      message: 'Login Berhasil',
      userId: user.id,
      role: user.role,
    };
  }
}