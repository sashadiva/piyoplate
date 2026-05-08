import 'dotenv/config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; 
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RecipesModule } from './recipes/recipes.module';
import { NutritionModule } from './nutrition/nutrition.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Tambahkan ini di paling atas!
    PrismaModule,
    AuthModule,
    UsersModule,
    RecipesModule,
    NutritionModule,
  ],
})
export class AppModule {}