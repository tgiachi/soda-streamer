-- CreateTable
CREATE TABLE "artist" (
    "id" BIGSERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "mId" VARCHAR(100) NOT NULL,
    "coverUrl" VARCHAR(200) NOT NULL,
    "name" VARCHAR(200) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "album" (
    "id" BIGSERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "mId" VARCHAR(100) NOT NULL,
    "coverUrl" VARCHAR(200) NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "year" INTEGER NOT NULL,
    "artistId" BIGINT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "track" (
    "id" BIGSERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "mId" VARCHAR(100) NOT NULL,
    "artistName" VARCHAR(200) NOT NULL,
    "bitRate" VARCHAR(10) NOT NULL,
    "fileSize" BIGINT NOT NULL,
    "fileName" VARCHAR(300) NOT NULL,
    "playCount" INTEGER NOT NULL,
    "globalCount" BIGINT NOT NULL,
    "trackLength" BIGINT NOT NULL,
    "trackName" VARCHAR(200) NOT NULL,
    "trackOrder" INTEGER NOT NULL,
    "albumId" BIGINT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "genre" (
    "id" BIGSERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_genreTotrack" (
    "A" BIGINT NOT NULL,
    "B" BIGINT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_genreTotrack_AB_unique" ON "_genreTotrack"("A", "B");

-- CreateIndex
CREATE INDEX "_genreTotrack_B_index" ON "_genreTotrack"("B");

-- AddForeignKey
ALTER TABLE "album" ADD FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "track" ADD FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_genreTotrack" ADD FOREIGN KEY ("A") REFERENCES "genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_genreTotrack" ADD FOREIGN KEY ("B") REFERENCES "track"("id") ON DELETE CASCADE ON UPDATE CASCADE;
