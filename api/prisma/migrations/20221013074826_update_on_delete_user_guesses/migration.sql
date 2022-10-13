-- DropForeignKey
ALTER TABLE `guesses` DROP FOREIGN KEY `guesses_user_id_fkey`;

-- AddForeignKey
ALTER TABLE `guesses` ADD CONSTRAINT `guesses_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
