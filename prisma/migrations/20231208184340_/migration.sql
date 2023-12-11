/*
  Warnings:

  - Added the required column `ownerInLG` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerInPC` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "newUser" BOOLEAN,
    "isBlocked" BOOLEAN,
    "ownerInPC" BOOLEAN NOT NULL,
    "ownerInLG" BOOLEAN NOT NULL
);
INSERT INTO "new_User" ("email", "id", "isBlocked", "name", "newUser", "password", "phone") SELECT "email", "id", "isBlocked", "name", "newUser", "password", "phone" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
