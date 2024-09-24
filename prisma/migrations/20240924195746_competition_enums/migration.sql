/*
  Warnings:

  - Changed the type of `competition` on the `CompetitionNews` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Competition" AS ENUM ('Debat', 'MoodCourt');

-- AlterTable
ALTER TABLE "CompetitionNews" DROP COLUMN "competition",
ADD COLUMN     "competition" "Competition" NOT NULL;
