/*
  Warnings:

  - You are about to drop the column `collectPointId` on the `reports` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `reports` table. All the data in the column will be lost.
  - Added the required column `collect_point_id` to the `reports` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `reports` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "reports" DROP CONSTRAINT "reports_collectPointId_fkey";

-- DropForeignKey
ALTER TABLE "reports" DROP CONSTRAINT "reports_userId_fkey";

-- AlterTable
ALTER TABLE "reports" DROP COLUMN "collectPointId",
DROP COLUMN "userId",
ADD COLUMN     "collect_point_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_collect_point_id_fkey" FOREIGN KEY ("collect_point_id") REFERENCES "collect_points"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
