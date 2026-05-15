import { Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { BookmarksService } from './bookmarks.service';

@ApiTags('Bookmarks')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('bookmarks')

export class BookmarksController {
constructor(private readonly bookmarksService: BookmarksService) {}

  @Post(':recipeId')
  @ApiOperation({ summary: 'Tambah atau hapus bookmark resep' })
  toggle(@Request() req, @Param('recipeId') recipeId: string) {
    // UserId diambil dari TOKEN, bukan diketik manual
    const userId = req.user.userId; 
    return this.bookmarksService.toggleBookmark(userId, +recipeId);
  }

  @Get('my-bookmarks')
  @ApiOperation({ summary: 'Lihat semua resep yang aku simpan' })
  getMyBookmarks(@Request() req) {
    const userId = req.user.userId;
    return this.bookmarksService.getUserBookmarks(userId);
  }
}

