/*
  Warnings:

  - Added the required column `categoria` to the `Gasto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Gasto" ADD COLUMN     "categoria" TEXT NOT NULL,
ADD COLUMN     "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
