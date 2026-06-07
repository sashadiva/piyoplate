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

  @ApiProperty({
    example: 520,
    description: 'Isi 0 jika mau pakai estimasi AI',
  })
  @Type(() => Number)
  @IsNumber()
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

  @ApiProperty({
    example: false,
    description: 'Jika true, kalori dihitung otomatis oleh AI dari bahan-bahan',
    required: false,
  })
  @IsOptional()
  use_ai_calories?: boolean;

  @ApiProperty({ example: 2, required: false, description: 'Jumlah porsi resep, default 1' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  servings?: number;
}
