/*
  Warnings:

  - You are about to drop the column `level` on the `matches` table. All the data in the column will be lost.
  - You are about to alter the column `group` on the `matches` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(1)`.
  - You are about to alter the column `away_team_name` on the `matches` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to alter the column `away_team_slug` on the `matches` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(3)`.
  - You are about to alter the column `home_team_name` on the `matches` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to alter the column `home_team_slug` on the `matches` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(3)`.
  - You are about to alter the column `username` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - Added the required column `round` to the `matches` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `guesses` DROP FOREIGN KEY `guesses_match_id_fkey`;

-- DropForeignKey
ALTER TABLE `guesses` DROP FOREIGN KEY `guesses_user_id_fkey`;

-- AlterTable
ALTER TABLE `guesses` MODIFY `user_id` VARCHAR(255) NOT NULL,
    MODIFY `match_id` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `matches` DROP COLUMN `level`,
    ADD COLUMN `round` VARCHAR(100) NOT NULL,
    MODIFY `group` VARCHAR(1) NULL,
    MODIFY `away_team_name` VARCHAR(100) NOT NULL,
    MODIFY `away_team_slug` VARCHAR(3) NOT NULL,
    MODIFY `home_team_name` VARCHAR(100) NOT NULL,
    MODIFY `home_team_slug` VARCHAR(3) NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `name` VARCHAR(255) NOT NULL,
    MODIFY `username` VARCHAR(50) NOT NULL,
    MODIFY `email` VARCHAR(255) NOT NULL,
    MODIFY `password` VARCHAR(255) NOT NULL;

-- AddForeignKey
ALTER TABLE `guesses` ADD CONSTRAINT `guesses_match_id_fkey` FOREIGN KEY (`match_id`) REFERENCES `matches`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `guesses` ADD CONSTRAINT `guesses_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
