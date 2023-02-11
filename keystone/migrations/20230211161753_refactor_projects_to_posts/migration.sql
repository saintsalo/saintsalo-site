/*
  Warnings:

  - You are about to drop the column `title` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Post_tags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Project_images` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_promo_fkey";

-- DropForeignKey
ALTER TABLE "_Post_tags" DROP CONSTRAINT "_Post_tags_A_fkey";

-- DropForeignKey
ALTER TABLE "_Post_tags" DROP CONSTRAINT "_Post_tags_B_fkey";

-- DropForeignKey
ALTER TABLE "_Project_images" DROP CONSTRAINT "_Project_images_A_fkey";

-- DropForeignKey
ALTER TABLE "_Project_images" DROP CONSTRAINT "_Project_images_B_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "title",
ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" JSONB NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]',
ADD COLUMN     "embed" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "name" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "order" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "promo" TEXT,
ADD COLUMN     "slug" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "status" TEXT DEFAULT 'offline',
ADD COLUMN     "type" TEXT DEFAULT 'music';

-- DropTable
DROP TABLE "Project";

-- DropTable
DROP TABLE "Tag";

-- DropTable
DROP TABLE "_Post_tags";

-- DropTable
DROP TABLE "_Project_images";

-- CreateTable
CREATE TABLE "_Post_images" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Post_images_AB_unique" ON "_Post_images"("A", "B");

-- CreateIndex
CREATE INDEX "_Post_images_B_index" ON "_Post_images"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_key" ON "Post"("slug");

-- CreateIndex
CREATE INDEX "Post_promo_idx" ON "Post"("promo");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_promo_fkey" FOREIGN KEY ("promo") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Post_images" ADD CONSTRAINT "_Post_images_A_fkey" FOREIGN KEY ("A") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Post_images" ADD CONSTRAINT "_Post_images_B_fkey" FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
