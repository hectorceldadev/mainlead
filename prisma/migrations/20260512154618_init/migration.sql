-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "name" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "sector" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);
