import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile/:id')
  getProfile(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  // UC-03: Update Profil (Misal ganti target kalori)
  @Patch('profile/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }
}