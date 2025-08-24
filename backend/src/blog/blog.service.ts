import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/db/prisma.service";
import { CreateBlogDto } from "./dto/create-blog.dto";
import { UpdateBlogDto } from "./dto/update-blog.dto";

@Injectable()
export class BlogService {
    constructor(private db: PrismaService) { }

    async getAllBlogs() {
        return await this.db.blogPost.findMany();
    }

    async createBlog(data: CreateBlogDto) {
        return await this.db.blogPost.create({
            data: {
                title: data.title,
                content: data.content,
                author: data.author,
            },
        });
    }

    async updateBlog(id: string, data: UpdateBlogDto) {
        // console.log("Data:", data);
        // console.log("id:", id);
        return await this.db.blogPost.update({
            where: { id },
            data: {
                title: data.title,
                content: data.content,
                author: data.author,
                updatedAt: new Date(),
            },
        });
    }

    async deleteBlog(id: string) {
        return await this.db.blogPost.delete({
            where: { id },
        });
    }
}
