import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateLogDto {
  @IsNumber()
  @IsNotEmpty()
  user_id!: number;

  @IsNumber()
  @IsOptional() // Tambahkan ini
  recipe_id?: number; // null jika Quick Add

  @IsString()
  @IsOptional() // Untuk simpan nama makanan manual
  food_name?: string;

  @IsNumber()
  @IsNotEmpty()
  calories_added!: number;
}