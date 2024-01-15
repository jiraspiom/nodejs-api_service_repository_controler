/*
  Warnings:

  - You are about to alter the column `quantidade` on the `Lancamento` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Lancamento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data" DATETIME NOT NULL,
    "operacao" TEXT NOT NULL,
    "setor" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "preco" DECIMAL NOT NULL
);
INSERT INTO "new_Lancamento" ("data", "id", "operacao", "preco", "quantidade", "setor") SELECT "data", "id", "operacao", "preco", "quantidade", "setor" FROM "Lancamento";
DROP TABLE "Lancamento";
ALTER TABLE "new_Lancamento" RENAME TO "Lancamento";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
