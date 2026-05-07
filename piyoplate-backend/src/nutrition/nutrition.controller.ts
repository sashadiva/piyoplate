import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { NutritionService } from './nutrition.service';
import { CreateLogDto } from './dto/create-log.dto';

@Controller('nutrition')
export class NutritionController {
  constructor(private readonly nutritionService: NutritionService) {}

  // UC-08: Mencatat makanan yang dimakan
  @Post('log')
  create(@Body() createLogDto: CreateLogDto) {
    return this.nutritionService.addLog(createLogDto);
  }

  // UC-08: Melihat ringkasan (Total, Target, Sisa Kalori)
  @Get('summary/:userId')
  getSummary(@Param('userId') userId: string) {
    return this.nutritionService.getDailySummary(+userId);
  }
}