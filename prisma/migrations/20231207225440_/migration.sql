/*
  Warnings:

  - You are about to drop the column `address` on the `Employee` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Employee" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "boatsName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "boatsFoto" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Employee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Employee" ("boatsFoto", "boatsName", "description", "email", "id", "userId") SELECT "boatsFoto", "boatsName", "description", "email", "id", "userId" FROM "Employee";
DROP TABLE "Employee";
ALTER TABLE "new_Employee" RENAME TO "Employee";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
