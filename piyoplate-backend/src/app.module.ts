// src/app.module.ts
import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RecipesModule } from './recipes/recipes.module';
import { NutritionModule } from './nutrition/nutrition.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    RecipesModule,
    NutritionModule
  ],
})
export class AppModule {}