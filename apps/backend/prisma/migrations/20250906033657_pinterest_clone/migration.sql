/*
  Warnings:

  - You are about to drop the column `description` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `boardId` on the `Pin` table. All the data in the column will be lost.
  - You are about to drop the column `img` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Save` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[title,userId]` on the table `Board` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `thumbnail` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comment` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Pin" DROP CONSTRAINT "Pin_boardId_fkey";

-- DropForeignKey
ALTER TABLE "Save" DROP CONSTRAINT "Save_pinId_fkey";

-- DropForeignKey
ALTER TABLE "Save" DROP CONSTRAINT "Save_userId_fkey";

-- AlterTable
ALTER TABLE "Board" ADD COLUMN     "description" TEXT,
ADD COLUMN     "isPrivate" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "thumbnail" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "description",
ADD COLUMN     "comment" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Pin" DROP COLUMN "boardId";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "img",
ADD COLUMN     "avatar" TEXT DEFAULT 'https://ik.imagekit.io/habav0i4f/general/noAvatar.png';

-- DropTable
DROP TABLE "Save";

-- CreateTable
CREATE TABLE "BoardPin" (
    "id" TEXT NOT NULL,
    "boardId" TEXT NOT NULL,
    "pinId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BoardPin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BoardPin_pinId_boardId_key" ON "BoardPin"("pinId", "boardId");

-- CreateIndex
CREATE UNIQUE INDEX "Board_title_userId_key" ON "Board"("title", "userId");

-- AddForeignKey
ALTER TABLE "BoardPin" ADD CONSTRAINT "BoardPin_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoardPin" ADD CONSTRAINT "BoardPin_pinId_fkey" FOREIGN KEY ("pinId") REFERENCES "Pin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
