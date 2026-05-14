import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRecipeDto {
  @ApiProperty({example: 'Nasi Goreng'})
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({example: 'Garam, minyak, nasi, telur'})
  @IsString()
  @IsNotEmpty()
  ingredients!: string;

  @ApiProperty({example: 'Tumis bawang putih hingga harum. Tambahkan telur dan aduk rata. Masukkan nasi dan aduk hingga tercampur rata. Tambahkan garam dan lada secukupnya.'})
  @IsString()
  @IsNotEmpty()
  instructions!: string;

  @ApiProperty({example: 500})
  @IsNumber()
  @IsNotEmpty()
  calories_per_serving!: number;

  @ApiProperty({example: 'https://example.com/image.jpg', required: false})
  @IsString()
  @IsOptional()
  image_url?: string;

  @ApiProperty({example: 1})
  @IsNumber()
  @IsNotEmpty()
  author_id!: number;
}