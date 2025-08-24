import { PartialType } from "@nestjs/mapped-types"
import { CreateBlogDto } from "./create-blog.dto"
import { IsOptional, IsString, MinLength, MaxLength } from "class-validator"

export class UpdateBlogDto extends PartialType(CreateBlogDto) {
  @IsOptional()
  @IsString({ message: "Title must be a string" })
  @MinLength(1, { message: "Title cannot be empty" })
  @MaxLength(200, { message: "Title cannot exceed 200 characters" })
  title?: string

  @IsOptional()
  @IsString({ message: "Content must be a string" })
  @MinLength(10, { message: "Content must be at least 10 characters long" })
  content?: string

  @IsOptional()
  @IsString({ message: "Author must be a string" })
  @MinLength(1, { message: "Author cannot be empty" })
  @MaxLength(100, { message: "Author cannot exceed 100 characters" })
  author?: string
}
