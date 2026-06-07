import {  Controller,  Get,  Post, Delete, Body, Param, Request, UseGuards, ParseIntPipe} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { NutritionService } from './nutrition.service';
import { CreateLogDto } from '../dto/create-log.dto';
import { CreatePhotoLogDto } from '../dto/create-photo-log.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Nutrition')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('nutrition')
export class NutritionController {
  constructor(private readonly nutritionService: NutritionService) {}

  // ── LOG ENDPOINTS ─────────────────────────────────────────────────────────

  /**
   * LOG MANUAL — user input nama + kalori sendiri
   * Source: 'manual'
   */
  @Post('log/manual')
  @ApiOperation({
    summary: 'Log kalori manual — input nama makanan & jumlah kalori',
    description: 'Untuk quick add atau input makanan yang tidak ada di database resep',
  })
  logManual(@Request() req, @Body() dto: CreateLogDto) {
    return this.nutritionService.logManual(req.user.userId, dto);
  }

  @Post('log/photo')
  @ApiOperation({
    summary: 'Log kalori dari foto makanan (AI)',
    description:
      'Kirim foto makanan dalam format base64. Claude akan mendeteksi jenis makanan dan estimasi kalorinya.',
  })
  logFromPhoto(@Request() req, @Body() dto: CreatePhotoLogDto) {
    return this.nutritionService.logFromPhoto(req.user.userId, dto);
  }

  // ── HISTORY ───────────────────────────────────────────────────────────────

  @Get('history/:userId')
  @ApiOperation({ summary: 'Riwayat semua log kalori user (50 terbaru)' })
  getHistory(@Param('userId', ParseIntPipe) userId: number) {
    return this.nutritionService.getHistory(userId);
  }

  // ── SUMMARY ───────────────────────────────────────────────────────────────

  @Get('summary/:userId')
  @ApiOperation({
    summary: 'Ringkasan kalori hari ini',
    description: 'Termasuk breakdown by source (resep, manual, foto)',
  })
  getDailySummary(@Param('userId', ParseIntPipe) userId: number) {
    return this.nutritionService.getDailySummary(userId);
  }

  @Get('weekly/:userId')
  @ApiOperation({ summary: 'Data kalori 7 hari terakhir' })
  getWeeklySummary(@Param('userId', ParseIntPipe) userId: number) {
    return this.nutritionService.getWeeklySummary(userId);
  }

  @Get('monthly/:userId')
  @ApiOperation({ summary: 'Ringkasan kalori 30 hari + makanan terbanyak' })
  getMonthlySummary(@Param('userId', ParseIntPipe) userId: number) {
    return this.nutritionService.getMonthlySummary(userId);
  }

  // ── DELETE ────────────────────────────────────────────────────────────────

  @Delete('log/:id')
  @ApiOperation({ summary: 'Hapus satu log kalori' })
  deleteLog(@Request() req, @Param('id', ParseIntPipe) logId: number) {
    return this.nutritionService.deleteLog(req.user.userId, logId);
  }
}
