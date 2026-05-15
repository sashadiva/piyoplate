import { Controller } from '@nestjs/common';
import { ApiTags } from 'node_modules/@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { Post, Body, UseGuards, Request, Get, Param } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ReviewService } from './review.service';

@ApiTags('Review')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewsService: ReviewService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Kasih rating dan review ke resep' })
  create(@Request() req, @Body() dto: { recipe_id: number, rating: number, comment?: string }) {
    return this.reviewsService.createReview(req.user.userId, dto);
  }

  @Get('recipe/:id')
  @ApiOperation({ summary: 'Lihat semua review di satu resep' })
  getByRecipe(@Param('id') recipeId: string) {
    return this.reviewsService.getRecipeReviews(+recipeId);
  }
}