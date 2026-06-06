import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min} from 'class-validator';

export class EstimateCaloriesDto {
  @ApiProperty({ example: 'Nasi Goreng Spesial' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ example: 'Nasi putih 200gr, Telur 2 butir, Kecap manis 2 sdm' })
  @IsString()
  @IsNotEmpty()
  ingredients!: string;

  @ApiProperty({ example: 2, required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  servings?: number;
}
