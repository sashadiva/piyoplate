import {  Controller,  Get,  Post,  Body,  Param,  Query,  Request,  UseGuards,  ParseIntPipe} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from '../dto/create-recipe.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Recipes')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  @ApiOperation({ summary: 'Ambil semua resep, bisa filter dengan search' })
  findAll(@Query('search') search?: string) {
    return this.recipesService.getAll(search);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detail resep + ulasan + avg rating' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.recipesService.getRecipeDetail(id);
  }

  @Post()
  @ApiOperation({ summary: 'Buat resep baru (author_id dari token JWT)' })
  create(@Request() req, @Body() createRecipeDto: CreateRecipeDto) {
    // req.user.userId berasal dari JwtStrategy.validate()
    return this.recipesService.create(req.user.userId, createRecipeDto);
  }

  @Post(':id/cook')
  @ApiOperation({ summary: 'Masak resep → kalori otomatis masuk ke tracker' })
  cook(@Request() req, @Param('id', ParseIntPipe) recipeId: number) {
    return this.recipesService.cookRecipe(req.user.userId, recipeId);
  }
}
