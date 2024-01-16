/*
  Warnings:

  - Added the required column `ativo` to the `Lancamento` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Lancamento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data" DATETIME NOT NULL,
    "operacao" TEXT NOT NULL,
    "ativo" TEXT NOT NULL,
    "setor" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "preco" DECIMAL NOT NULL,
    "create_at" DATETIME NOT NULL,
    "update_at" DATETIME
);
INSERT INTO "new_Lancamento" ("create_at", "data", "id", "operacao", "preco", "quantidade", "setor", "update_at") SELECT "create_at", "data", "id", "operacao", "preco", "quantidade", "setor", "update_at" FROM "Lancamento";
DROP TABLE "Lancamento";
ALTER TABLE "new_Lancamento" RENAME TO "Lancamento";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;