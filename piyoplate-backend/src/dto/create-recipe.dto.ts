import {  IsNotEmpty,  IsNumber,  IsOptional,  IsString} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateRecipeDto {
  @ApiProperty({ example: 'Nasi Goreng Spesial' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ example: 'Indonesia', required: false })
  @IsOptional()
  @IsString()
  cuisine_type?: string;

  @ApiProperty({ example: 'Resep nasi goreng enak', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'Nasi putih 200gr, Telur 2 butir, Kecap manis 2 sdm' })
  @IsString()
  @IsNotEmpty()
  ingredients!: string;

  @ApiProperty({ example: 'Tumis bawang. Masukkan telur. Tambahkan nasi.' })
  @IsString()
  @IsNotEmpty()
  instructions!: string;

  @ApiProperty({ example: 520 })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  calories_per_serving!: number;

  @ApiProperty({ example: 25, required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  cook_time_minutes?: number;

  @ApiProperty({ example: 'https://example.com/image.jpg', required: false })
  @IsOptional()
  @IsString()
  image_url?: string;

}
