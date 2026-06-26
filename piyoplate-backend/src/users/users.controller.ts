import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  ParseIntPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserDto } from '../dto/update-users.dto';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

interface RequestWithUser {
  user: {
    userId: number;
    username: string;
  };
}

@ApiTags('Users')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile/:id')
  @ApiOperation({ summary: 'Ambil profil user by ID' })
  getProfile(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch('profile/:id')
  @ApiOperation({ summary: 'Update profil user' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Patch('change-password')
  @ApiOperation({ summary: 'Ubah password user yang sedang login' })
  changePassword(@Req() req: RequestWithUser, @Body() dto: ChangePasswordDto) {
    return this.usersService.changePassword(req.user.userId, dto);
  }
}
