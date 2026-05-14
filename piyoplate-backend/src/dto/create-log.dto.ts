import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateLogDto {
  @ApiProperty()
  @IsOptional()
  recipe_id?: number;

  @ApiProperty()
  @IsOptional()
  food_name?: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  calories_added!: number;
}