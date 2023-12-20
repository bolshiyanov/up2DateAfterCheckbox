/*
  Warnings:

  - Added the required column `fingerPrint` to the `User` table without a default value. This is not possible if the table is not empty.

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
    "fingerPrint" TEXT NOT NULL,
    "customField1" TEXT,
    "customField2" TEXT,
    "customField3" TEXT
);
INSERT INTO "new_User" ("customField1", "customField2", "customField3", "dateRegistration", "email", "id", "isBlocked", "name", "newUser", "owner", "password", "phone") SELECT "customField1", "customField2", "customField3", "dateRegistration", "email", "id", "isBlocked", "name", "newUser", "owner", "password", "phone" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
