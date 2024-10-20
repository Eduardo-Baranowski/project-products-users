-- AlterTable
ALTER TABLE `users` MODIFY `role` ENUM('admin', 'common', 'development') NOT NULL DEFAULT 'common';
