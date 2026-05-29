import {  Controller,  Post,  Delete, Get,  Param,  Request,  UseGuards,  ParseIntPipe} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { BookmarksService } from './bookmarks.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Bookmarks')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('bookmarks')
export class BookmarksController {
  constructor(private readonly bookmarksService: BookmarksService) {}

  @Get()
  @ApiOperation({ summary: 'Ambil semua resep yang di-bookmark user' })
  getUserBookmarks(@Request() req) {
    return this.bookmarksService.getUserBookmarks(req.user.userId);
  }

  @Post(':recipeId')
  @ApiOperation({ summary: 'Bookmark sebuah resep' })
  add(@Request() req, @Param('recipeId', ParseIntPipe) recipeId: number) {
    return this.bookmarksService.addBookmark(req.user.userId, recipeId);
  }

  @Delete(':recipeId')
  @ApiOperation({ summary: 'Hapus bookmark resep' })
  remove(@Request() req, @Param('recipeId', ParseIntPipe) recipeId: number) {
    return this.bookmarksService.removeBookmark(req.user.userId, recipeId);
  }

  @Get('check/:recipeId')
  @ApiOperation({ summary: 'Cek apakah resep sudah di-bookmark' })
  check(@Request() req, @Param('recipeId', ParseIntPipe) recipeId: number) {
    return this.bookmarksService.isBookmarked(req.user.userId, recipeId);
  }
}
