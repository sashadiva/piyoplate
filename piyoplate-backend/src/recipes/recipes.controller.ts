import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from '../dto/create-recipe.dto';
import {JwtAuthGuard} from '../auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Recipes')
@UseGuards(JwtAuthGuard)
@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @ApiOperation({ summary: 'Get all recipes with optional search' })
  @Get()
  findAll(@Query('search') search?: string) {
    return this.recipesService.getAll(search);
  }

  @ApiOperation({ summary: 'Get details of a specific recipe' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipesService.getDetail(+id);
  }

  @ApiOperation({ summary: 'Create a new recipe' })
  @Post()
  create(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipesService.create(createRecipeDto);
  }
}