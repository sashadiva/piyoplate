import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty({ example: 'passwordLamaSaya' })
  @IsString()
  old_password!: string;

  @ApiProperty({ example: 'passwordBaruSaya123' })
  @IsString()
  @MinLength(6, { message: 'Password baru minimal 6 karakter' })
  new_password!: string;
}
