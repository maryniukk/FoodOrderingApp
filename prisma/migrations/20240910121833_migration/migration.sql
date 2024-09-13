-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_productItemId_fkey";

-- AlterTable
ALTER TABLE "CartItem" ALTER COLUMN "productItemId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_productItemId_fkey" FOREIGN KEY ("productItemId") REFERENCES "ProductItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;
