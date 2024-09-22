/*
  Warnings:

  - You are about to drop the column `picturePath` on the `Blogs` table. All the data in the column will be lost.
  - You are about to drop the column `picturePath` on the `News` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Blogs" DROP COLUMN "picturePath",
ADD COLUMN     "picturePaths" TEXT[];

-- AlterTable
ALTER TABLE "News" DROP COLUMN "picturePath",
ADD COLUMN     "picturePaths" TEXT[];
