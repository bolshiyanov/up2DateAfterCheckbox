/*
  Warnings:

  - Added the required column `typePort` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Employee" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "boatsName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "boatsFoto" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "typeBoat" TEXT NOT NULL,
    "dateRegistration" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isBlocked" BOOLEAN,
    "isNewBoat" BOOLEAN,
    "isAvailable" BOOLEAN,
    "typePort" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Employee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Employee" ("boatsFoto", "boatsName", "dateRegistration", "description", "email", "id", "isAvailable", "isBlocked", "isNewBoat", "phone", "typeBoat", "userId") SELECT "boatsFoto", "boatsName", "dateRegistration", "description", "email", "id", "isAvailable", "isBlocked", "isNewBoat", "phone", "typeBoat", "userId" FROM "Employee";
DROP TABLE "Employee";
ALTER TABLE "new_Employee" RENAME TO "Employee";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
