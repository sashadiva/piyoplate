import {  Controller,  Get,  Post, Body, Param, Request, UseGuards, ParseIntPipe} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { NutritionService } from './nutrition.service';
import { CreateLogDto } from '../dto/create-log.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Nutrition')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('nutrition')
export class NutritionController {
  constructor(private readonly nutritionService: NutritionService) {}

  @Post('log')
  @ApiOperation({ summary: 'Tambah log kalori (manual / quick add)' })
  addLog(@Request() req, @Body() dto: CreateLogDto) {
    return this.nutritionService.addLog(req.user.userId, dto);
  }

  @Get('history/:userId')
  @ApiOperation({ summary: 'Riwayat log kalori user' })
  getHistory(@Param('userId', ParseIntPipe) userId: number) {
    return this.nutritionService.getHistory(userId);
  }

  @Get('summary/:userId')
  @ApiOperation({ summary: 'Ringkasan kalori hari ini' })
  getDailySummary(@Param('userId', ParseIntPipe) userId: number) {
    return this.nutritionService.getDailySummary(userId);
  }

  @Get('weekly/:userId')
  @ApiOperation({ summary: 'Ringkasan kalori 7 hari terakhir' })
  getWeeklySummary(@Param('userId', ParseIntPipe) userId: number) {
    return this.nutritionService.getWeeklySummary(userId);
  }
}
