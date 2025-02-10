/*
  Warnings:

  - You are about to drop the column `content` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `groupId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `toId` on the `Message` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_groupId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_toId_fkey";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "content",
DROP COLUMN "groupId",
DROP COLUMN "toId";

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_replyTo_fkey" FOREIGN KEY ("replyTo") REFERENCES "Message"("id") ON DELETE SET NULL ON UPDATE CASCADE;
