import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { RecipesService } from './recipes.service';

@Controller('recipes')

export class RecipesModule {
  constructor(private readonly recipesService: RecipesService) {}

  @Get() // UC-04 & UC-05 (Homepage & Search)
  findAll(@Query('search') search?: string) {
    return this.recipesService.getAll(search);
  }

  @Get(':id') // UC-07 (Detail Recipe)
  findOne(@Param('id') id: string) {
    return this.recipesService.getDetail(+id);
  }

  @Post() // UC-06 (Post Recipe)
  create(@Body() createRecipeDto: any) {
    return this.recipesService.create(createRecipeDto);
  }
}
