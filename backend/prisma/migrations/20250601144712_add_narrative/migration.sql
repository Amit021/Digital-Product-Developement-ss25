/*
  Warnings:

  - You are about to drop the column `reportJson` on the `IncidentReport` table. All the data in the column will be lost.
  - Added the required column `narrative` to the `IncidentReport` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "IncidentReport" DROP COLUMN "reportJson",
ADD COLUMN     "narrative" TEXT NOT NULL,
ALTER COLUMN "pdfBlob" DROP NOT NULL;
