import { IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({example: 'john_doe', required: false})
  @IsOptional()
  @IsString()
  username?: string;
  
  @ApiProperty({example: 'John Doe', required: false})
  @IsOptional()
  @IsString()
  full_name?: string;

  @ApiProperty({example: 'https://example.com/profile.jpg', required: false})
  @IsOptional()
  @IsString()
  profile_picture_url?: string;

  @ApiProperty({example: 2000, required: false})
  @IsOptional()
  @IsNumber()
  daily_calorie_goal?: number;
}