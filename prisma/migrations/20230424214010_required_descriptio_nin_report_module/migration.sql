/*
  Warnings:

  - Made the column `description` on table `reports` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "reports" ALTER COLUMN "description" SET NOT NULL;
