/*
  Warnings:

  - The primary key for the `Blogs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Blogs` table. All the data in the column will be lost.
  - You are about to drop the column `picturePaths` on the `Blogs` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Blogs` table. All the data in the column will be lost.
  - The `id` column on the `Blogs` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `author` to the `Blogs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Blogs" DROP CONSTRAINT "Blogs_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "picturePaths",
DROP COLUMN "updatedAt",
ADD COLUMN     "author" TEXT NOT NULL,
ADD COLUMN     "commentCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "summary" TEXT,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "Blogs_pkey" PRIMARY KEY ("id");
