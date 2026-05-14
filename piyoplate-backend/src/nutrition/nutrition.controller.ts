import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { NutritionService } from './nutrition.service';
import { CreateLogDto } from '../dto/create-log.dto';
import {JwtAuthGuard} from '../auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Nutrition')
@UseGuards(JwtAuthGuard)
@Controller('nutrition')
export class NutritionController {
  constructor(private readonly nutritionService: NutritionService) {}

  @Get('history/:userId')
  @ApiOperation({ summary: 'Get nutrition history for a user' })
  getHistory(@Param('userId') userId: string) {
    return this.nutritionService.getHistory(+userId);
  }

  @Post('log')
  @ApiOperation({ summary: 'Create a new nutrition log' })
  create(@Body() createLogDto: CreateLogDto) {
    return this.nutritionService.addLog(createLogDto);
  }

  @Get('summary/:userId')
  @ApiOperation({ summary: 'Get daily nutrition summary for a user' })
  getSummary(@Param('userId') userId: string) {
    return this.nutritionService.getDailySummary(+userId);
  }
}