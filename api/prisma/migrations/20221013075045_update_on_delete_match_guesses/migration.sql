-- DropForeignKey
ALTER TABLE `guesses` DROP FOREIGN KEY `guesses_match_id_fkey`;

-- AddForeignKey
ALTER TABLE `guesses` ADD CONSTRAINT `guesses_match_id_fkey` FOREIGN KEY (`match_id`) REFERENCES `matches`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
