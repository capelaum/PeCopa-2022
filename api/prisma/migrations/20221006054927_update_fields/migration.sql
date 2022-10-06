/*
  Warnings:

  - You are about to drop the column `team_a_score` on the `guesses` table. All the data in the column will be lost.
  - You are about to drop the column `team_b_score` on the `guesses` table. All the data in the column will be lost.
  - You are about to drop the column `team_a_name` on the `matches` table. All the data in the column will be lost.
  - You are about to drop the column `team_a_slug` on the `matches` table. All the data in the column will be lost.
  - You are about to drop the column `team_b_name` on the `matches` table. All the data in the column will be lost.
  - You are about to drop the column `team_b_slug` on the `matches` table. All the data in the column will be lost.
  - Added the required column `away_team_score` to the `guesses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `home_team_score` to the `guesses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `away_team_name` to the `matches` table without a default value. This is not possible if the table is not empty.
  - Added the required column `away_team_slug` to the `matches` table without a default value. This is not possible if the table is not empty.
  - Added the required column `home_team_name` to the `matches` table without a default value. This is not possible if the table is not empty.
  - Added the required column `home_team_slug` to the `matches` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `guesses` DROP COLUMN `team_a_score`,
    DROP COLUMN `team_b_score`,
    ADD COLUMN `away_team_score` INTEGER NOT NULL,
    ADD COLUMN `home_team_score` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `matches` DROP COLUMN `team_a_name`,
    DROP COLUMN `team_a_slug`,
    DROP COLUMN `team_b_name`,
    DROP COLUMN `team_b_slug`,
    ADD COLUMN `away_team_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `away_team_slug` VARCHAR(191) NOT NULL,
    ADD COLUMN `home_team_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `home_team_slug` VARCHAR(191) NOT NULL;
