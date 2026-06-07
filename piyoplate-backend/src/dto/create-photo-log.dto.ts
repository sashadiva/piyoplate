import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Min} from 'class-validator';

export class CreatePhotoLogDto {
  @ApiProperty({
    description: 'Foto makanan dalam format base64 (tanpa prefix data:image)',
    example: '/9j/4AAQSkZJRgAB...',
  })
  @IsString()
  @IsNotEmpty()
  image_base64!: string;

  @ApiProperty({
    enum: ['image/jpeg', 'image/png', 'image/webp'],
    example: 'image/jpeg',
    required: false,
  })
  @IsOptional()
  @IsString()
  media_type?: 'image/jpeg' | 'image/png' | 'image/webp';

  @ApiProperty({
    example: '1 piring besar',
    description: 'Keterangan ukuran porsi dari user (opsional, membantu AI)',
    required: false,
  })
  @IsOptional()
  @IsString()
  portion_note?: string;
}
