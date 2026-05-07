import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RecipesModule } from './recipes/recipes.module';
import { NutritionModule } from './nutrition/nutrition.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule, UsersModule, RecipesModule, NutritionModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
