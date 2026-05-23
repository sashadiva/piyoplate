import { Controller, Get, Post, Body, Param, Query, Request } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from '../dto/create-recipe.dto';
import {JwtAuthGuard} from '../auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Recipes')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post(':id/cook')
  @ApiOperation({ summary: 'Menjalankan aksi memasak resep dan menambah kalori otomatis' })
  async cook(@Request() req, @Param('id') recipeId: string) {
    return this.recipesService.cookRecipe(req.user.userId, +recipeId);
  }

  @ApiOperation({ summary: 'Get all recipes with optional search' })
  @Get()
  findAll(@Query('search') search?: string) {
    return this.recipesService.getAll(search);
  }

  @ApiOperation({ summary: 'Get details of a specific recipe' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipesService.getRecipeDetail(+id);
  }

  @ApiOperation({ summary: 'Create a new recipe' })
  @Post()
  create(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipesService.create(createRecipeDto);
  }

  @ApiOperation({ summary: 'Search for recipes' })
  @Get('search')
  search(@Query('q') query: string) {
    return this.recipesService.search(query);
  }

}