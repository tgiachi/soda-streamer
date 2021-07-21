-- CreateTable
CREATE TABLE "directory_watch" (
    "id" BIGSERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "directory" VARCHAR(255) NOT NULL,
    "isEnabled" BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY ("id")
);
