import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async register(data: RegisterDto){
  return this.prisma.$transaction(async (tx) => {
    const existingUser = await tx.users.findUnique({ // Gunakan 'tx', jangan 'this.prisma' di dalam transaksi
      where: { email: data.email }
    });

    if (existingUser) {
      throw new BadRequestException('Email sudah terdaftar!');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const user = await tx.users.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashedPassword,
      },
      select: { id: true, username: true, email: true }
    });

    return { 
      message: 'User berhasil didaftarkan', 
      userId: user.id, 
      username: user.username, 
      email: user.email 
    };
  });
}

  async login(data: LoginDto) {
    const user = await this.prisma.users.findUnique({
      where: { email: data.email },
    });

    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      throw new UnauthorizedException('Email atau password salah');
    }

    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        full_name: user.full_name
      }
    };
  }
}