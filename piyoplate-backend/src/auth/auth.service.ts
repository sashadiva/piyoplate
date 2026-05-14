import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async register(data: RegisterDto) {
    const existingUser = await this.prisma.users.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new BadRequestException('Email sudah terdaftar!');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    // 3. Simpan ke database
    return this.prisma.users.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashedPassword,
      },
      select: { id: true, username: true, email: true } // Jangan kirim balik passwordnya
    });
  }

  async login(data: LoginDto) {
    const user = await this.prisma.users.findUnique({
      where: { email: data.email },
    });

    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      throw new UnauthorizedException('Email atau password salah');
    }

    const payload = { sub: user.id, username: user.username };
    const token = this.jwtService.sign(payload);

    return {
      message: 'Login Berhasil',
      user: { id: user.id, username: user.username }
    };
  }
}