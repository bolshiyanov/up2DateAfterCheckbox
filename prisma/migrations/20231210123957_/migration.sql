/*
  Warnings:

  - You are about to drop the column `ownerInLG` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `ownerInPC` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `ownerInLG` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `ownerInPC` on the `User` table. All the data in the column will be lost.

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
    "userId" TEXT NOT NULL,
    CONSTRAINT "Employee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Employee" ("boatsFoto", "boatsName", "dateRegistration", "description", "email", "id", "isAvailable", "isBlocked", "isNewBoat", "phone", "typeBoat", "userId") SELECT "boatsFoto", "boatsName", "dateRegistration", "description", "email", "id", "isAvailable", "isBlocked", "isNewBoat", "phone", "typeBoat", "userId" FROM "Employee";
DROP TABLE "Employee";
ALTER TABLE "new_Employee" RENAME TO "Employee";
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "newUser" BOOLEAN,
    "isBlocked" BOOLEAN,
    "owner" BOOLEAN,
    "dateRegistration" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("dateRegistration", "email", "id", "isBlocked", "name", "newUser", "password", "phone") SELECT "dateRegistration", "email", "id", "isBlocked", "name", "newUser", "password", "phone" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
