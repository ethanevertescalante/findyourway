-- AlterTable
ALTER TABLE "pin" ADD COLUMN     "tripId" TEXT;

-- CreateTable
CREATE TABLE "trip" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "tripName" TEXT NOT NULL,

    CONSTRAINT "trip_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "trip_userId_idx" ON "trip"("userId");

-- AddForeignKey
ALTER TABLE "pin" ADD CONSTRAINT "pin_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "trip"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trip" ADD CONSTRAINT "trip_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
