-- CreateTable
CREATE TABLE "IncidentReport" (
    "id" TEXT NOT NULL,
    "residentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reportJson" JSONB NOT NULL,
    "pdfBlob" BYTEA NOT NULL,

    CONSTRAINT "IncidentReport_pkey" PRIMARY KEY ("id")
);
