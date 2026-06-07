import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min} from 'class-validator';

export class CreateLogDto {
  @ApiProperty({ example: 'Mie Ayam Bakso' })
  @IsString()
  @IsNotEmpty()
  food_name!: string;

  @ApiProperty({ example: 450 })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  calories_added!: number;

  @ApiProperty({ example: 1, required: false, description: 'ID resep jika berasal dari resep' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  recipe_id?: number;
}