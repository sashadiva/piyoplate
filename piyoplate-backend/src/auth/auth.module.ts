import { Module, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import * as bcrypt from 'bcrypt';

@Module({
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async register(data: any) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.prisma.users.create({
      data: { ...data, password: hashedPassword },
      select: { id: true, username: true, email: true }
    });
  }

  async login(email: string, pass: string) {
    const user = await this.prisma.users.findUnique({ where: { email } });
    if (user && await bcrypt.compare(pass, user.password)) {
      const payload = { sub: user.id, username: user.username, role: user.role };
      return {
        access_token: await this.jwtService.signAsync(payload),
        user: { id: user.id, username: user.username, role: user.role }
      };
    }
    throw new UnauthorizedException('Invalid credentials');
  }
}
