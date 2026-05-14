import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({example: 'john_doe'})
  @IsNotEmpty()
  username!: string;

  @ApiProperty({example: 'john@example.com'})
  @IsEmail()
  email!: string;

  @ApiProperty({example: 'password123'})
  @MinLength(8)
  password!: string;
}