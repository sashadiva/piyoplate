import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  async createReview(userId: number, dto: { recipe_id: number, rating: number, comment?: string }) {
    return this.prisma.reviews.create({
      data: {
        user_id: userId,
        recipe_id: dto.recipe_id,
        rating: dto.rating,
        comment: dto.comment,
      },
      include: { user: { select: { username: true } } } // Balikin nama usernya buat di UI
    });
  }

  async getRecipeReviews(recipeId: number) {
    return this.prisma.reviews.findMany({
      where: { recipe_id: recipeId },
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { username: true } } }
    });
  }
}