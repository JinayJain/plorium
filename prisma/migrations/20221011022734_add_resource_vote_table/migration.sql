-- CreateEnum
CREATE TYPE "BlockType" AS ENUM ('RESOURCE', 'NOTE');

-- CreateTable
CREATE TABLE "ResourceVote" (
    "resourceId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ResourceVote_pkey" PRIMARY KEY ("resourceId","userId")
);

-- AddForeignKey
ALTER TABLE "ResourceVote" ADD CONSTRAINT "ResourceVote_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourceVote" ADD CONSTRAINT "ResourceVote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
