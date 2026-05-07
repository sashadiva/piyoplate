import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  // Ambil semua resep atau cari berdasarkan judul (?search=...)
  @Get()
  findAll(@Query('search') search?: string) {
    return this.recipesService.getAll(search);
  }

  // Lihat detail resep tertentu
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipesService.getDetail(+id);
  }

  // User posting resep baru
  @Post()
  create(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipesService.create(createRecipeDto);
  }
}