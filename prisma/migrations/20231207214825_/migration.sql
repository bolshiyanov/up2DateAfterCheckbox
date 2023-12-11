/*
  Warnings:

  - You are about to drop the column `age` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Employee` table. All the data in the column will be lost.
  - Added the required column `BoadsFoto` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `boadsName` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Employee" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "boadsName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "BoadsFoto" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Employee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Employee" ("address", "id", "userId") SELECT "address", "id", "userId" FROM "Employee";
DROP TABLE "Employee";
ALTER TABLE "new_Employee" RENAME TO "Employee";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
