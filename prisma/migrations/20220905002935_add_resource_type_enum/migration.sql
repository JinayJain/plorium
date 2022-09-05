/*
  Warnings:

  - Added the required column `type` to the `Resource` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ResourceType" AS ENUM ('VIDEO', 'BLOG', 'TUTORIAL', 'DOCUMENT', 'PAPER');

-- AlterTable
ALTER TABLE "Resource" ADD COLUMN     "type" "ResourceType" NOT NULL;
