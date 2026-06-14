import {  Controller,  Get,  Post,  Body,  Param,  Query,  Request,  UseGuards,  ParseIntPipe, Delete} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from '../dto/create-recipe.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { EstimateCaloriesDto } from 'src/dto/estimate-calories.dto';

@ApiTags('Recipes')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  @ApiOperation({ summary: 'Ambil semua resep, bisa filter dengan ?search=' })
  findAll(@Query('search') search?: string) {
    return this.recipesService.getAll(search);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detail resep + semua ulasan + avg rating' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.recipesService.getRecipeDetail(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Buat resep baru',
    description:
      'Set use_ai_calories=true untuk estimasi kalori otomatis dari bahan via Claude AI',
  })
  create(@Request() req, @Body() dto: CreateRecipeDto) {
    return this.recipesService.create(req.user.userId, dto);
  }

  @Post('ai/estimate-calories')
  @ApiOperation({
    summary: 'Estimasi kalori dari bahan via AI (preview, tidak simpan)',
    description:
      'Gunakan untuk preview kalori sebelum user submit form resep. Response berisi calories_per_serving, breakdown, dan notes.',
  })
  estimateCalories(@Body() dto: EstimateCaloriesDto) {
    return this.recipesService.previewCalorieEstimate(dto);
  }

  @Post(':id/cook')
  @ApiOperation({
    summary: 'Masak resep → kalori otomatis masuk ke tracker',
    description:
      'Membuat nutrition log baru dengan source=recipe. Kalori diambil dari calories_per_serving resep.',
  })
  cook(@Request() req, @Param('id', ParseIntPipe) recipeId: number) {
    return this.recipesService.cookRecipe(req.user.userId, recipeId);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Menghapus resep yang sudah diposting', 
    description: 'Menghapus resep dari database'
  })
  deleteRecipe(@Param('id') id:string){
    return this.recipesService.deleteRecipe(Number(id))
  }
}
