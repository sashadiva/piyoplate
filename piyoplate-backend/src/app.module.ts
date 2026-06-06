import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RecipesModule } from './recipes/recipes.module';
import { NutritionModule } from './nutrition/nutrition.module';
import { ReviewModule } from './review/review.module';
import { BookmarksModule } from './bookmarks/bookmarks.module';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UsersModule,
    RecipesModule,
    NutritionModule,
    ReviewModule,
    BookmarksModule,
    AiModule,
  ],
})
export class AppModule {}
