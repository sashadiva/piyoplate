import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from '../dto/update-users.dto';
import { ChangePasswordDto } from '../dto/change-password.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: number) {
    const user = await this.prisma.users.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        full_name: true,
        profile_picture_url: true,
        daily_calorie_goal: true,
        weight: true,
        height: true,
        role: true,
        created_at: true,
      },
    });

    if (!user) throw new NotFoundException('User tidak ditemukan');
    return user;
  }

  async update(id: number, data: UpdateUserDto) {
    const user = await this.prisma.users.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User tidak ditemukan');

    return this.prisma.users.update({
      where: { id },
      data,
      select: {
        id: true,
        username: true,
        email: true,
        full_name: true,
        profile_picture_url: true,
        daily_calorie_goal: true,
        weight: true,
        height: true,
        role: true,
      },
    });
  }

  async changePassword(id: number, dto: ChangePasswordDto) {
    const user = await this.prisma.users.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User tidak ditemukan');

    const isValid = await bcrypt.compare(dto.old_password, user.password);
    if (!isValid) {
      throw new BadRequestException('Password lama tidak sesuai');
    }

    const hashedNewPassword = await bcrypt.hash(dto.new_password, 10);

    await this.prisma.users.update({
      where: { id },
      data: { password: hashedNewPassword },
    });

    return { message: 'Password berhasil diubah' };
  }
}
