/*
  Warnings:

  - You are about to drop the column `boatsFoto` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `boatsName` on the `Employee` table. All the data in the column will be lost.
  - Added the required column `rideName` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Employee" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dateRegistration" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rideName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rideFoto" TEXT,
    "googleMapLink" TEXT,
    "phone" TEXT NOT NULL,
    "typeBoat" TEXT NOT NULL,
    "typePort" TEXT NOT NULL,
    "isBlocked" BOOLEAN,
    "isNewBoat" BOOLEAN,
    "isAvailable" BOOLEAN,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Employee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Employee" ("dateRegistration", "description", "googleMapLink", "id", "isAvailable", "isBlocked", "isNewBoat", "phone", "typeBoat", "typePort", "userId") SELECT "dateRegistration", "description", "googleMapLink", "id", "isAvailable", "isBlocked", "isNewBoat", "phone", "typeBoat", "typePort", "userId" FROM "Employee";
DROP TABLE "Employee";
ALTER TABLE "new_Employee" RENAME TO "Employee";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
