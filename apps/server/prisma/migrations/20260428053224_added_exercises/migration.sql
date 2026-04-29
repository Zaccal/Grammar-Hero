/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Level" AS ENUM ('Basic', 'Intermediate', 'Advanced');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "displayUsername" TEXT,
ADD COLUMN     "username" TEXT;

-- CreateTable
CREATE TABLE "Topics" (
    "_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "short_description" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "duration_max" TIME(6),
    "duration_min" TIME(6) NOT NULL,
    "image" TEXT,
    "content" TEXT NOT NULL,
    "level" "Level" NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Topics_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Like" (
    "_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "topic_id" TEXT NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Bookmark" (
    "_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "topic_id" TEXT NOT NULL,

    CONSTRAINT "Bookmark_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Exercise" (
    "_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "question" TEXT NOT NULL,
    "explanation" TEXT,
    "is_multiple_choice" BOOLEAN NOT NULL DEFAULT false,
    "hint" TEXT,
    "topic_id" TEXT NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Answer" (
    "_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "text" TEXT NOT NULL,
    "is_correct" BOOLEAN NOT NULL DEFAULT false,
    "exercise_id" TEXT NOT NULL,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Like_user_id_topic_id_key" ON "Like"("user_id", "topic_id");

-- CreateIndex
CREATE UNIQUE INDEX "Bookmark_user_id_topic_id_key" ON "Bookmark"("user_id", "topic_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- AddForeignKey
ALTER TABLE "Topics" ADD CONSTRAINT "Topics_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "Topics"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "Topics"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "Topics"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "Exercise"("_id") ON DELETE CASCADE ON UPDATE CASCADE;
