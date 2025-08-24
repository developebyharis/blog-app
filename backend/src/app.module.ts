
import { Module } from '@nestjs/common';
import { BlogModule } from './blog/blog.module';
import { PrismaModule } from './db/prisma.module';

@Module({
  imports: [BlogModule],
  providers: [PrismaModule]
})
export class AppModule { }
