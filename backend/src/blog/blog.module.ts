import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { PrismaModule } from 'src/db/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [BlogController],
    providers: [BlogService]
}) export class BlogModule { }
