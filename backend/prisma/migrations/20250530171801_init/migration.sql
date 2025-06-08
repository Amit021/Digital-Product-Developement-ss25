/*
  Warnings:

  - The primary key for the `IncidentReport` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `IncidentReport` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `residentId` on the `IncidentReport` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "IncidentReport" DROP CONSTRAINT "IncidentReport_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "residentId",
ADD COLUMN     "residentId" INTEGER NOT NULL,
ADD CONSTRAINT "IncidentReport_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Resident" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "address" TEXT,
    "photoUrl" TEXT,
    "insurer" TEXT,
    "dnr" BOOLEAN,
    "fallRisk" TEXT,
    "vaccinations" TEXT,
    "hospitalHistory" TEXT,
    "medications" TEXT,
    "weight" DOUBLE PRECISION,
    "height" DOUBLE PRECISION,

    CONSTRAINT "Resident_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "IncidentReport" ADD CONSTRAINT "IncidentReport_residentId_fkey" FOREIGN KEY ("residentId") REFERENCES "Resident"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
