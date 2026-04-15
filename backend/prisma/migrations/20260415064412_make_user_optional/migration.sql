-- DropForeignKey
ALTER TABLE "articles" DROP CONSTRAINT "articles_userId_fkey";

-- AlterTable
ALTER TABLE "articles" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "articles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
