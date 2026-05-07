import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateLogDto {
  @IsNumber()
  @IsNotEmpty()
  user_id!: number;

  @IsNumber()
  @IsNotEmpty()
  recipe_id!: number;

  @IsNumber()
  @IsNotEmpty()
  calories_added!: number;
}