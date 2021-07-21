/*
  Warnings:

  - Added the required column `md5Hash` to the `track` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "track" ADD COLUMN     "md5Hash" VARCHAR(50) NOT NULL;
