import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Max, Min} from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsNumber()
  recipe_id!: number;

  @ApiProperty({ example: 5, description: 'Rating 1-5' })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(5)
  rating!: number;

  @ApiProperty({ example: 'Enak banget!', required: false })
  @IsOptional()
  @IsString()
  comment?: string;
}
