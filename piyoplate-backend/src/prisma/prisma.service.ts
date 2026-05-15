import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(pool);
    
    super({ adapter });
  }

  async onModuleInit() {
    try {
      // Memanggil fungsi $connect asli milik PrismaClient
      await this.$connect();
      console.log('✅ Database connected successfully with PrismaPg Adapter!');
    } catch (error) {
      console.error('❌ Failed to connect to database', error);
    }
  }

  async onModuleDestroy() {
    // Memanggil fungsi $disconnect asli milik PrismaClient
    await this.$disconnect();
  }
}