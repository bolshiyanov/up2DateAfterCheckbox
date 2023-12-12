/*
  Warnings:

  - You are about to drop the column `eveningSundayy` on the `Employee` table. All the data in the column will be lost.

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
    "morningMonday" TEXT,
    "afternoonMonday" TEXT,
    "eveningMonday" TEXT,
    "extraMonday" TEXT,
    "extraIsAvailableMonday" BOOLEAN,
    "morningTuesday" TEXT,
    "afternoonTuesday" TEXT,
    "eveningTuesday" TEXT,
    "extraTuesday" TEXT,
    "extrasIAvailableTuesday" BOOLEAN,
    "morningWednesday" TEXT,
    "afternoonWednesday" TEXT,
    "eveningWednesday" TEXT,
    "extraWednesday" TEXT,
    "extraIsAvailableWednesday" BOOLEAN,
    "morningThursday" TEXT,
    "afternoonThursday" TEXT,
    "eveningThursday" TEXT,
    "extraThursday" TEXT,
    "extraIsAvailableThursday" BOOLEAN,
    "morningFriday" TEXT,
    "afternoonFriday" TEXT,
    "eveningFriday" TEXT,
    "extraFriday" TEXT,
    "extraIsAvailableFriday" BOOLEAN,
    "morningSaturday" TEXT,
    "afternoonSaturday" TEXT,
    "eveningSaturday" TEXT,
    "extraSaturday" TEXT,
    "extraIsAvailableSaturday" BOOLEAN,
    "morningSunday" TEXT,
    "afternoonSunday" TEXT,
    "eveningSunday" TEXT,
    "extraSunday" TEXT,
    "extraIsAvailableSunday" BOOLEAN,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Employee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Employee" ("afternoonFriday", "afternoonMonday", "afternoonSaturday", "afternoonSunday", "afternoonThursday", "afternoonTuesday", "afternoonWednesday", "categorias", "dateRegistration", "description", "eveningFriday", "eveningMonday", "eveningSaturday", "eveningThursday", "eveningTuesday", "eveningWednesday", "extraFriday", "extraIsAvailableFriday", "extraIsAvailableMonday", "extraIsAvailableSaturday", "extraIsAvailableSunday", "extraIsAvailableThursday", "extraIsAvailableWednesday", "extraMonday", "extraSaturday", "extraSunday", "extraThursday", "extraTuesday", "extraWednesday", "extrasIAvailableTuesday", "googleMapLink", "id", "isAvailable", "isBlocked", "isNewRide", "morningFriday", "morningMonday", "morningSaturday", "morningSunday", "morningThursday", "morningTuesday", "morningWednesday", "phone", "rideFoto", "rideName", "rideType", "startPoints", "userId") SELECT "afternoonFriday", "afternoonMonday", "afternoonSaturday", "afternoonSunday", "afternoonThursday", "afternoonTuesday", "afternoonWednesday", "categorias", "dateRegistration", "description", "eveningFriday", "eveningMonday", "eveningSaturday", "eveningThursday", "eveningTuesday", "eveningWednesday", "extraFriday", "extraIsAvailableFriday", "extraIsAvailableMonday", "extraIsAvailableSaturday", "extraIsAvailableSunday", "extraIsAvailableThursday", "extraIsAvailableWednesday", "extraMonday", "extraSaturday", "extraSunday", "extraThursday", "extraTuesday", "extraWednesday", "extrasIAvailableTuesday", "googleMapLink", "id", "isAvailable", "isBlocked", "isNewRide", "morningFriday", "morningMonday", "morningSaturday", "morningSunday", "morningThursday", "morningTuesday", "morningWednesday", "phone", "rideFoto", "rideName", "rideType", "startPoints", "userId" FROM "Employee";
DROP TABLE "Employee";
ALTER TABLE "new_Employee" RENAME TO "Employee";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
