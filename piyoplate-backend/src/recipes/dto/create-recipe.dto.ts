import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateRecipeDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  ingredients!: string;

  @IsString()
  @IsNotEmpty()
  instructions!: string;

  @IsNumber()
  @IsNotEmpty()
  calories_per_serving!: number;

  @IsString()
  @IsOptional()
  image_url?: string;

  @IsNumber()
  @IsNotEmpty()
  author_id!: number;
}