/*
  Warnings:

  - You are about to drop the `invitedUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "invitedUser";

-- CreateTable
CREATE TABLE "InvitedUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "scope" TEXT NOT NULL,
    "scopeId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "acceptedAt" TIMESTAMP(3),
    "isEnabled" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InvitedUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InvitedUser_email_scope_scopeId_key" ON "InvitedUser"("email", "scope", "scopeId");
