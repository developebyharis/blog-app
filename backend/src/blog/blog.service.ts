import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/db/prisma.service";
import { CreateBlogDto } from "./dto/create-blog.dto";
import { UpdateBlogDto } from "./dto/update-blog.dto";

@Injectable()
export class BlogService {
  constructor(private db: PrismaService) {}

  async getAllBlogs() {
    return await this.db.blogPost.findMany({
      include: {
        author: true,
      },
    });
  }
  async getUserBlogs(userId: string) {
    return await this.db.blogPost.findMany({
      where: { authorId: userId },
    });
  }

  async createBlog(userId: string, data: CreateBlogDto) {
    return await this.db.blogPost.create({
      data: {
        title: data.title,
        content: data.content,
        authorId: userId,
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
