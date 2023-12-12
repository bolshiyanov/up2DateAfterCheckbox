/*
  Warnings:

  - You are about to drop the column `typeBoat` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `typePort` on the `Employee` table. All the data in the column will be lost.
  - Added the required column `categorias` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startPoints` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Employee" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dateRegistration" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rideType" TEXT NOT NULL,
    "rideName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rideFoto" TEXT,
    "googleMapLink" TEXT,
    "phone" TEXT NOT NULL,
    "categorias" TEXT NOT NULL,
    "startPoints" TEXT NOT NULL,
    "isBlocked" BOOLEAN,
    "isNewRide" BOOLEAN,
    "isAvailable" BOOLEAN,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Employee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Employee" ("dateRegistration", "description", "googleMapLink", "id", "isAvailable", "isBlocked", "isNewRide", "phone", "rideFoto", "rideName", "rideType", "userId") SELECT "dateRegistration", "description", "googleMapLink", "id", "isAvailable", "isBlocked", "isNewRide", "phone", "rideFoto", "rideName", "rideType", "userId" FROM "Employee";
DROP TABLE "Employee";
ALTER TABLE "new_Employee" RENAME TO "Employee";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
