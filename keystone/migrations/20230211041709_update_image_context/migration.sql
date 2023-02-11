/*
  Warnings:

  - You are about to drop the column `image` on the `Image` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Image" DROP COLUMN "image",
ADD COLUMN     "filename" TEXT NOT NULL DEFAULT '';
