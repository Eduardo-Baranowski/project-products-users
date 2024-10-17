-- AlterTable
ALTER TABLE `users` ADD COLUMN `role` ENUM('admin', 'common') NOT NULL DEFAULT 'common';
