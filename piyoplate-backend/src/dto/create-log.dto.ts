import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator';


export class CreateLogDto {
  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  recipe_id?: number;

  @ApiProperty({ example: 'Mie Ayam', required: false })
  @IsOptional()
  @IsString()
  food_name?: string;

  @ApiProperty({ example: 450 })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  calories_added!: number;
}
