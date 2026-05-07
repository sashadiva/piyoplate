import { IsEmail, IsNotEmpty, MinLength, IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsEmail({}, { message: 'Format email salah!' })
  email!: string;

  @IsString()
  @MinLength(8, { message: 'Password minimal 8 karakter!' })
  password!: string;
}