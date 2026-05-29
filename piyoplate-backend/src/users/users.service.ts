import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from '../dto/update-users.dto';

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
}
