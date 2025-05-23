/*
  Warnings:

  - You are about to drop the column `userId` on the `Gasto` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Gasto" DROP CONSTRAINT "Gasto_userId_fkey";

-- AlterTable
ALTER TABLE "Gasto" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "_GastosUsuarios" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_GastosUsuarios_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_GastosUsuarios_B_index" ON "_GastosUsuarios"("B");

-- AddForeignKey
ALTER TABLE "_GastosUsuarios" ADD CONSTRAINT "_GastosUsuarios_A_fkey" FOREIGN KEY ("A") REFERENCES "Gasto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GastosUsuarios" ADD CONSTRAINT "_GastosUsuarios_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
