/*
  Warnings:

  - You are about to drop the `Blog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BlogTranslation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BlogTranslation" DROP CONSTRAINT "BlogTranslation_blogId_fkey";

-- DropTable
DROP TABLE "Blog";

-- DropTable
DROP TABLE "BlogTranslation";

-- CreateTable
CREATE TABLE "Blogs" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "summary" TEXT,
    "author" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "commentCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Blogs_pkey" PRIMARY KEY ("id")
);
