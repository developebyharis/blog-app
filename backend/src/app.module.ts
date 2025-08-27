
import { Module } from '@nestjs/common';
import { BlogModule } from './blog/blog.module';
import { PrismaModule } from './db/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [BlogModule, AuthModule],
  providers: [PrismaModule]
})
export class AppModule { }
