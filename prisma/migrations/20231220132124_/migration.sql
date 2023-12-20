/*
  Warnings:

  - You are about to drop the column `fingerPrint` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dateRegistration" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "isBlocked" BOOLEAN,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "newUser" BOOLEAN,
    "owner" BOOLEAN,
    "deviceId" TEXT,
    "customField1" TEXT,
    "customField2" TEXT,
    "customField3" TEXT
);
INSERT INTO "new_User" ("customField1", "customField2", "customField3", "dateRegistration", "email", "id", "isBlocked", "name", "newUser", "owner", "password", "phone") SELECT "customField1", "customField2", "customField3", "dateRegistration", "email", "id", "isBlocked", "name", "newUser", "owner", "password", "phone" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
