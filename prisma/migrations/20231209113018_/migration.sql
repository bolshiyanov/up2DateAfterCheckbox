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
    "userId" TEXT NOT NULL,
    CONSTRAINT "Employee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Employee" ("boatsFoto", "boatsName", "description", "email", "id", "phone", "typeBoat", "userId") SELECT "boatsFoto", "boatsName", "description", "email", "id", "phone", "typeBoat", "userId" FROM "Employee";
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
    "ownerInPC" BOOLEAN,
    "ownerInLG" BOOLEAN,
    "dateRegistration" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("email", "id", "isBlocked", "name", "newUser", "ownerInLG", "ownerInPC", "password", "phone") SELECT "email", "id", "isBlocked", "name", "newUser", "ownerInLG", "ownerInPC", "password", "phone" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
