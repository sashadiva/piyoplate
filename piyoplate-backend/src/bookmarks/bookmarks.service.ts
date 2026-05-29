import {  Injectable,  NotFoundException,  ConflictException} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookmarksService {
  constructor(private readonly prisma: PrismaService) {}

  async addBookmark(userId: number, recipeId: number) {
    const recipe = await this.prisma.recipes.findUnique({
      where: { id: recipeId },
    });
    if (!recipe) throw new NotFoundException('Resep tidak ditemukan');

    const existing = await this.prisma.bookmarks.findUnique({
      where: { user_id_recipe_id: { user_id: userId, recipe_id: recipeId } },
    });
    if (existing) throw new ConflictException('Resep sudah di-bookmark');

    await this.prisma.bookmarks.create({
      data: { user_id: userId, recipe_id: recipeId },
    });

    return { message: 'Resep berhasil disimpan', recipe_id: recipeId };
  }

  async removeBookmark(userId: number, recipeId: number) {
    const existing = await this.prisma.bookmarks.findUnique({
      where: { user_id_recipe_id: { user_id: userId, recipe_id: recipeId } },
    });
    if (!existing) throw new NotFoundException('Bookmark tidak ditemukan');

    await this.prisma.bookmarks.delete({
      where: { user_id_recipe_id: { user_id: userId, recipe_id: recipeId } },
    });

    return { message: 'Bookmark dihapus', recipe_id: recipeId };
  }

  async getUserBookmarks(userId: number) {
    const bookmarks = await this.prisma.bookmarks.findMany({
      where: { user_id: userId },
      include: {
        recipe: {
          include: {
            author: { select: { id: true, username: true } },
            _count: { select: { reviews: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return bookmarks.map((b) => b.recipe);
  }

  async isBookmarked(userId: number, recipeId: number) {
    const bookmark = await this.prisma.bookmarks.findUnique({
      where: { user_id_recipe_id: { user_id: userId, recipe_id: recipeId } },
    });
    return { bookmarked: !!bookmark };
  }
}
