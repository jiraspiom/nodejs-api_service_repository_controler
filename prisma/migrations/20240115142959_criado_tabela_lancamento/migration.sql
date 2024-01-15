-- CreateTable
CREATE TABLE "Lancamento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data" DATETIME NOT NULL,
    "operacao" TEXT NOT NULL,
    "setor" TEXT NOT NULL,
    "quantidade" TEXT NOT NULL,
    "preco" TEXT NOT NULL
);
