/*
  Warnings:

  - A unique constraint covering the columns `[home_team_slug,away_team_slug,match_time]` on the table `matches` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `matches_home_team_slug_away_team_slug_match_time_key` ON `matches`(`home_team_slug`, `away_team_slug`, `match_time`);
