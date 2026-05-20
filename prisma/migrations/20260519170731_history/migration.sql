-- AlterEnum
ALTER TYPE "LeadSource" ADD VALUE 'LINKEDIN';

-- CreateTable
CREATE TABLE "HistoryCompany" (
    "id" TEXT NOT NULL,
    "placeId" TEXT,
    "linkedInId" TEXT,
    "name" TEXT NOT NULL,
    "location" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "websiteUrl" TEXT,
    "rating" DOUBLE PRECISION,
    "source" "LeadSource" NOT NULL,
    "savedCompanyId" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HistoryCompany_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HistoryContact" (
    "id" TEXT NOT NULL,
    "linkedInUrl" TEXT,
    "name" TEXT NOT NULL,
    "role" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "source" "LeadSource" NOT NULL,
    "historyCompanyId" TEXT,
    "savedContactId" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HistoryContact_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "HistoryCompany_userId_idx" ON "HistoryCompany"("userId");

-- CreateIndex
CREATE INDEX "HistoryCompany_source_idx" ON "HistoryCompany"("source");

-- CreateIndex
CREATE INDEX "HistoryCompany_userId_savedCompanyId_idx" ON "HistoryCompany"("userId", "savedCompanyId");

-- CreateIndex
CREATE UNIQUE INDEX "HistoryCompany_placeId_key" ON "HistoryCompany"("placeId");

-- CreateIndex
CREATE UNIQUE INDEX "HistoryCompany_linkedInId_key" ON "HistoryCompany"("linkedInId");

-- CreateIndex
CREATE INDEX "HistoryContact_userId_idx" ON "HistoryContact"("userId");

-- CreateIndex
CREATE INDEX "HistoryContact_source_idx" ON "HistoryContact"("source");

-- AddForeignKey
ALTER TABLE "HistoryCompany" ADD CONSTRAINT "HistoryCompany_savedCompanyId_fkey" FOREIGN KEY ("savedCompanyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoryCompany" ADD CONSTRAINT "HistoryCompany_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoryContact" ADD CONSTRAINT "HistoryContact_historyCompanyId_fkey" FOREIGN KEY ("historyCompanyId") REFERENCES "HistoryCompany"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoryContact" ADD CONSTRAINT "HistoryContact_savedContactId_fkey" FOREIGN KEY ("savedContactId") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoryContact" ADD CONSTRAINT "HistoryContact_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
