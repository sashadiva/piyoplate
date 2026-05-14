import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from '../dto/update-users.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: number) {
    const user = await this.prisma.users.findUnique({
      where: { id },
      select: { 
        id: true, 
        username: true, 
        email: true, 
        full_name: true, 
        daily_calorie_goal: true,
        role: true 
      },
    });

    if (!user) throw new NotFoundException('User tidak ditemukan');
    return user;
  }

  async update(id: number, data: UpdateUserDto) {
    return this.prisma.users.update({
      where: { id },
      data: data,
    });
  }
}