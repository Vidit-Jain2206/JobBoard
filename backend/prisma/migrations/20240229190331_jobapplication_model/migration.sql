/*
  Warnings:

  - Made the column `location` on table `Company` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "location" SET NOT NULL;

-- CreateTable
CREATE TABLE "JobApplication" (
    "id" SERIAL NOT NULL,
    "applicationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,
    "jobListing_id" INTEGER NOT NULL,

    CONSTRAINT "JobApplication_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_jobListing_id_fkey" FOREIGN KEY ("jobListing_id") REFERENCES "JobListing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
