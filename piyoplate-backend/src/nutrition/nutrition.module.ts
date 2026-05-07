import { Module } from '@nestjs/common';
import { NutritionService } from './nutrition.service';
import { PrismaService } from '../prisma/prisma.service';
import { NutritionController } from './nutrition.controller';

@Module({
  controllers: [NutritionController],
  providers: [NutritionService, PrismaService],
})
export class NutritionModule {}