import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { NutritionService } from './nutrition.service';
import { CreateLogDto } from './dto/create-log.dto';

@Controller('nutrition')
export class NutritionController {
  constructor(private readonly nutritionService: NutritionService) {}

  @Post('log')
  create(@Body() createLogDto: CreateLogDto) {
    return this.nutritionService.addLog(createLogDto);
  }

  @Get('summary/:userId')
  getSummary(@Param('userId') userId: string) {
    return this.nutritionService.getDailySummary(+userId);
  }
}