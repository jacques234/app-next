-- CreateTable
CREATE TABLE "Gasto" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "monto" DECIMAL(65,30) NOT NULL,
    "descripcion" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Gasto_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Gasto" ADD CONSTRAINT "Gasto_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
