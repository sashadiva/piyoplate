import { IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';


export class UpdateUserDto {
  @ApiProperty({ example: 'john_doe', required: false })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty({ example: 'John Doe', required: false })
  @IsOptional()
  @IsString()
  full_name?: string;

  @ApiProperty({ example: 'https://example.com/pic.jpg', required: false })
  @IsOptional()
  @IsString()
  profile_picture_url?: string;

  @ApiProperty({ example: 2000, required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  daily_calorie_goal?: number;

  @ApiProperty({ example: 70.5, required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  weight?: number;

  @ApiProperty({ example: 170, required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  height?: number;
}
