import {  Injectable,  BadRequestException,  UnauthorizedException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: RegisterDto) {
    // Cek email sudah terdaftar
    const existing = await this.prisma.users.findUnique({
      where: { email: data.email },
    });
    if (existing) {
      throw new BadRequestException('Email sudah terdaftar');
    }

    // Cek username sudah dipakai
    const existingUsername = await this.prisma.users.findUnique({
      where: { username: data.username },
    });
    if (existingUsername) {
      throw new BadRequestException('Username sudah dipakai');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.users.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });

    return {
      message: 'Registrasi berhasil',
      user,
    };
  }

  async login(data: LoginDto) {
    // Cari user by email
    const user = await this.prisma.users.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new UnauthorizedException('Email atau password salah');
    }

    // Verifikasi password
    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email atau password salah');
    }

    // Buat JWT — sub = user.id (penting untuk req.user.userId)
    const payload = { sub: user.id, username: user.username };
    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        full_name: user.full_name,
        daily_calorie_goal: user.daily_calorie_goal,
        role: user.role,
      },
    };
  }
}
