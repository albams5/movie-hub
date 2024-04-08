/*
  Warnings:

  - The primary key for the `GenreOnMovies` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `genreId` on the `GenreOnMovies` table. All the data in the column will be lost.
  - You are about to drop the column `movieId` on the `GenreOnMovies` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Movie` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Genre` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `genreID` to the `GenreOnMovies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `movieID` to the `GenreOnMovies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userID` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GenreOnMovies" DROP CONSTRAINT "GenreOnMovies_genreId_fkey";

-- DropForeignKey
ALTER TABLE "GenreOnMovies" DROP CONSTRAINT "GenreOnMovies_movieId_fkey";

-- DropForeignKey
ALTER TABLE "Movie" DROP CONSTRAINT "Movie_userId_fkey";

-- AlterTable
ALTER TABLE "GenreOnMovies" DROP CONSTRAINT "GenreOnMovies_pkey",
DROP COLUMN "genreId",
DROP COLUMN "movieId",
ADD COLUMN     "genreID" INTEGER NOT NULL,
ADD COLUMN     "movieID" INTEGER NOT NULL,
ADD CONSTRAINT "GenreOnMovies_pkey" PRIMARY KEY ("movieID", "genreID");

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "userId",
ADD COLUMN     "userID" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Genre_name_key" ON "Genre"("name");

-- AddForeignKey
ALTER TABLE "Movie" ADD CONSTRAINT "Movie_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenreOnMovies" ADD CONSTRAINT "GenreOnMovies_movieID_fkey" FOREIGN KEY ("movieID") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenreOnMovies" ADD CONSTRAINT "GenreOnMovies_genreID_fkey" FOREIGN KEY ("genreID") REFERENCES "Genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
