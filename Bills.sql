CREATE TABLE IF NOT EXISTS `billing_bills` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `cid` VARCHAR(60) NOT NULL,
  `receiver_name` VARCHAR(120) NOT NULL,
  `issuer_cid` VARCHAR(60) NOT NULL,
  `issuer_name` VARCHAR(100) NOT NULL,
  `job` VARCHAR(60) NOT NULL,
  `amount` INT NOT NULL,
  `description` VARCHAR(255) NOT NULL DEFAULT '',
  `account` ENUM('cash','bank') NOT NULL DEFAULT 'bank',
  `status` ENUM('unpaid','paid','refunded','cancelled') NOT NULL DEFAULT 'unpaid',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `paid_at` TIMESTAMP NULL DEFAULT NULL,
  `refunded_by_cid` VARCHAR(60) NULL DEFAULT NULL,
  `refunded_by_name` VARCHAR(120) NULL DEFAULT NULL,
  `refunded_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_bills_cid` (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE IF NOT EXISTS `billing_job_perms` (
  `job` VARCHAR(60) NOT NULL,
  `data` LONGTEXT NOT NULL,
  PRIMARY KEY (`job`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `billing_wallpapers` (
  `cid` VARCHAR(60) NOT NULL,
  `wallpaper` VARCHAR(1024) NOT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


