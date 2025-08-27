/*
  Warnings:

  - You are about to drop the column `author` on the `blog_posts` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `blog_posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."blog_posts" DROP COLUMN "author",
ADD COLUMN     "authorId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."blog_posts" ADD CONSTRAINT "blog_posts_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
