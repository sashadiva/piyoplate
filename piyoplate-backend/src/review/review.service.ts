import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from '../dto/create-review.dto';

@Injectable()
export class ReviewService {
  constructor(private readonly prisma: PrismaService) {}

  async createReview(userId: number, dto: CreateReviewDto) {
    // Cek resep ada
    const recipe = await this.prisma.recipes.findUnique({
      where: { id: dto.recipe_id },
    });
    if (!recipe) throw new NotFoundException('Resep tidak ditemukan');

    return this.prisma.reviews.create({
      data: {
        user_id: userId,
        recipe_id: dto.recipe_id,
        rating: dto.rating,
        comment: dto.comment,
      },
      include: {
        user: { select: { id: true, username: true } },
      },
    });
  }

  async getRecipeReviews(recipeId: number) {
    return this.prisma.reviews.findMany({
      where: { recipe_id: recipeId },
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { id: true, username: true, profile_picture_url: true } },
      },
    });
  }
}
