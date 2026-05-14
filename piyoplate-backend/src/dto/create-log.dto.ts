import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateLogDto {
  @ApiProperty({example: 1})
  @IsNumber()
  @IsNotEmpty()
  user_id!: number;

  @ApiProperty({example: 1, required: false })
  @IsNumber()
  @IsOptional()
  recipe_id?: number;

  @ApiProperty({example: 'Nasi Goreng', required: false })
  @IsString()
  @IsOptional()
  food_name?: string;

  @ApiProperty({example: 500 })
  @IsNumber()
  @IsNotEmpty()
  calories_added!: number;
}