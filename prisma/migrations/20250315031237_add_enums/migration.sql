/*
  Warnings:

  - Changed the type of `type` on the `Board` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `scope` on the `InvitedUser` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "BoardType" AS ENUM ('PUBLIC', 'PRIVATE');

-- CreateEnum
CREATE TYPE "InvitedUserScope" AS ENUM ('BOARD', 'TEAM');

-- AlterTable
ALTER TABLE "Board" DROP COLUMN "type",
ADD COLUMN     "type" "BoardType" NOT NULL;

-- AlterTable
ALTER TABLE "InvitedUser" DROP COLUMN "scope",
ADD COLUMN     "scope" "InvitedUserScope" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "InvitedUser_email_scope_scopeId_key" ON "InvitedUser"("email", "scope", "scopeId");
