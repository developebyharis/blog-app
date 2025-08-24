import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { BlogService } from "./blog.service";
import { CreateBlogDto } from "./dto/create-blog.dto";
import { UpdateBlogDto } from "./dto/update-blog.dto";

@Controller("/blog")
export class BlogController {
    constructor(private blogService: BlogService) { }

    @Get()
    getAllBlogs() {
        return this.blogService.getAllBlogs()
    }

    @Post()
    createBlog(@Body() data: CreateBlogDto) {
        return this.blogService.createBlog(data)

    }
    @Patch("/:id")
    updateBlog(@Param("id") id: string, @Body() data: UpdateBlogDto) {
        // console.log("id:", id)
        // console.log("data:", data)

        return this.blogService.updateBlog(id, data)
    }
    @Delete("/:id")
    deleteBlog(@Param("id") id: string) {
        return this.blogService.deleteBlog(id)

    }
}