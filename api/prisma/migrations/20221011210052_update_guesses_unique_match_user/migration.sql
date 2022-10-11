/*
  Warnings:

  - A unique constraint covering the columns `[user_id,match_id]` on the table `guesses` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `guesses_user_id_match_id_key` ON `guesses`(`user_id`, `match_id`);
