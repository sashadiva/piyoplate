import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { AiModule } from 'src/ai/ai.module';
import { NutritionModule } from 'src/nutrition/nutrition.module';

@Module({
  imports: [AiModule, NutritionModule],
  controllers: [RecipesController],
  providers: [RecipesService],
})
export class RecipesModule {}
