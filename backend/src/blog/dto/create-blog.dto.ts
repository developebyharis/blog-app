import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateBlogDto {
  @IsNotEmpty({ message: "Title is required" })
  @IsString({ message: "Title must be a string" })
  @MaxLength(200, { message: "Title cannot exceed 200 characters" })
  title: string;

  @IsNotEmpty({ message: "Content is required" })
  @IsString({ message: "Content must be a string" })
  @MinLength(10, { message: "Content must be at least 10 characters long" })
  content!: string;

 
}