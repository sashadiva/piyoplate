import {  Controller,  Post,  Get,  Body,  Param,  Request,  UseGuards,  ParseIntPipe} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ReviewService } from './review.service';
import { CreateReviewDto } from '../dto/create-review.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Review')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @ApiOperation({ summary: 'Beri rating dan review ke resep' })
  create(@Request() req, @Body() dto: CreateReviewDto) {
    return this.reviewService.createReview(req.user.userId, dto);
  }

  @Get('recipe/:id')
  @ApiOperation({ summary: 'Lihat semua review di satu resep' })
  getByRecipe(@Param('id', ParseIntPipe) recipeId: number) {
    return this.reviewService.getRecipeReviews(recipeId);
  }
}
