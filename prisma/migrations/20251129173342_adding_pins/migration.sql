-- CreateTable
CREATE TABLE "pin" (
    "id" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "location" TEXT NOT NULL,
    "review" TEXT NOT NULL,
    "cost" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "pin_userId_idx" ON "pin"("userId");

-- AddForeignKey
ALTER TABLE "pin" ADD CONSTRAINT "pin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
