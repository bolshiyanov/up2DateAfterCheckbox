/*
  Warnings:

  - You are about to drop the column `admin` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `block` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `newUser` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL
);
INSERT INTO "new_User" ("email", "id", "name", "password", "phone") SELECT "email", "id", "name", "password", "phone" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
