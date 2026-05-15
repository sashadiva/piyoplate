import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookmarksService {
  constructor(private prisma: PrismaService) {}

  async toggleBookmark(userId: number, recipeId: number) {
    // 1. Cek apakah sudah pernah di-bookmark
    const existing = await this.prisma.bookmarks.findFirst({
      where: { 
        user_id: userId, 
        recipe_id: recipeId 
      },
    });

    if (existing) {
      // 2. Kalau ada, hapus (Un-bookmark)
      await this.prisma.bookmarks.delete({ where: { id: existing.id } });
      return { bookmarked: false, message: 'Bookmark dihapus' };
    }

    // 3. Kalau belum ada, buat baru
    await this.prisma.bookmarks.create({
      data: { user_id: userId, recipe_id: recipeId },
    });
    return { bookmarked: true, message: 'Berhasil simpan ke bookmark' };
  }

  // Untuk nampilin daftar simpanan di profil user
  async getUserBookmarks(userId: number) {
    return this.prisma.bookmarks.findMany({
      where: { user_id: userId },
      include: { recipe: true }, // Ambil data resepnya sekalian
    });
  }
}