/*
  Warnings:

  - You are about to drop the column `adress` on the `collect_points` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `collect_points` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "collect_points" DROP COLUMN "adress";

-- CreateIndex
CREATE UNIQUE INDEX "collect_points_name_key" ON "collect_points"("name");
