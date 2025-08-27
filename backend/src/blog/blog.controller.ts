import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { BlogService } from "./blog.service";
import { CreateBlogDto } from "./dto/create-blog.dto";
import { UpdateBlogDto } from "./dto/update-blog.dto";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { GetUser } from "src/auth/getUser.decorator";

@Controller("blog")
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Get()
  getAllBlogs() {
    return this.blogService.getAllBlogs();
  }
  @Get("me")
  @UseGuards(JwtAuthGuard)
  async getUserBlogs(@GetUser("userId") userId: string) {
    return this.blogService.getUserBlogs(userId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createBlog(@GetUser("userId") userId: string, @Body() data: CreateBlogDto) {
    // console.log("userId", userId);
    // console.log("data", data);

    return this.blogService.createBlog(userId, data);
  }
  @Patch("/:id")
  @UseGuards(JwtAuthGuard)
  updateBlog(@Param("id") id: string, @Body() data: UpdateBlogDto) {
    return this.blogService.updateBlog(id, data);
  }
  @Delete("/:id")
  @UseGuards(JwtAuthGuard)
  deleteBlog(@Param("id") id: string) {
    return this.blogService.deleteBlog(id);
  }
}
