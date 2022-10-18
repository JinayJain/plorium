/*
  Warnings:

  - Added the required column `kind` to the `Block` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Block" ADD COLUMN     "kind" "BlockType";

-- Set the kind to "RESOURCE" if there exists a ResourceBlock with the same id
UPDATE "Block" SET "kind" = 'RESOURCE' WHERE "id" IN (SELECT "id" FROM "ResourceBlock");

-- Set the kind to "NOTE" if there exists a NoteBlock with the same id
UPDATE "Block" SET "kind" = 'NOTE' WHERE "id" IN (SELECT "id" FROM "NoteBlock");

-- Set kind column to NOT NULL
ALTER TABLE "Block" ALTER COLUMN "kind" SET NOT NULL;
