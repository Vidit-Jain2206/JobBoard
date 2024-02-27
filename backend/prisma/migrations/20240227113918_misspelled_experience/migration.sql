/*
  Warnings:

  - You are about to drop the column `expereince` on the `JobListing` table. All the data in the column will be lost.
  - Added the required column `experience` to the `JobListing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JobListing" DROP COLUMN "expereince",
ADD COLUMN     "experience" TEXT NOT NULL;
