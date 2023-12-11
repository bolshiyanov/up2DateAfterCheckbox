/*
  Warnings:

  - Made the column `phone` on table `Employee` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Employee" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dateRegistration" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "boatsName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "boatsFoto" TEXT,
    "email" TEXT,
    "phone" TEXT NOT NULL,
    "typeBoat" TEXT NOT NULL,
    "typePort" TEXT NOT NULL,
    "isBlocked" BOOLEAN,
    "isNewBoat" BOOLEAN,
    "isAvailable" BOOLEAN,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Employee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Employee" ("boatsFoto", "boatsName", "dateRegistration", "description", "email", "id", "isAvailable", "isBlocked", "isNewBoat", "phone", "typeBoat", "typePort", "userId") SELECT "boatsFoto", "boatsName", "dateRegistration", "description", "email", "id", "isAvailable", "isBlocked", "isNewBoat", "phone", "typeBoat", "typePort", "userId" FROM "Employee";
DROP TABLE "Employee";
ALTER TABLE "new_Employee" RENAME TO "Employee";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
