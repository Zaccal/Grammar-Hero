/*
  Warnings:

  - A unique constraint covering the columns `[_id,user_id]` on the table `Topics` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Topics__id_user_id_key" ON "Topics"("_id", "user_id");
