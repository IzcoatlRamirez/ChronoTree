-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Nodos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "imageUrl" TEXT,
    "nombre" TEXT NOT NULL,
    "fechaNacimiento" TEXT NOT NULL,
    "lugarNacimiento" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "X" REAL NOT NULL,
    "Y" REAL NOT NULL,
    CONSTRAINT "Nodos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Aristas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "X" REAL NOT NULL,
    "Y" REAL NOT NULL,
    "X2" REAL NOT NULL,
    "rootId" INTEGER NOT NULL,
    "childId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Aristas_rootId_fkey" FOREIGN KEY ("rootId") REFERENCES "Nodos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Aristas_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Nodos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Aristas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "NodosConyuge" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "imageUrl" TEXT,
    "nombre" TEXT NOT NULL,
    "fechaNacimiento" TEXT NOT NULL,
    "lugarNacimiento" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "X" REAL NOT NULL,
    "Y" REAL NOT NULL,
    CONSTRAINT "NodosConyuge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AristasConyuge" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "X" REAL NOT NULL,
    "Y" REAL NOT NULL,
    "rootId" INTEGER NOT NULL,
    "conyugeId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "AristasConyuge_rootId_fkey" FOREIGN KEY ("rootId") REFERENCES "Nodos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AristasConyuge_conyugeId_fkey" FOREIGN KEY ("conyugeId") REFERENCES "NodosConyuge" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AristasConyuge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "AristasConyuge_rootId_key" ON "AristasConyuge"("rootId");

-- CreateIndex
CREATE UNIQUE INDEX "AristasConyuge_conyugeId_key" ON "AristasConyuge"("conyugeId");
