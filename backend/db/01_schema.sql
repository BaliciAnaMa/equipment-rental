-- backend/db/01_schema.sql
-- Schema inițială a bazei de date RentCam (MySQL 8.0)
-- Toate denumirile de tabele, coloane, constrângeri și enum-uri sunt în limba română (fără diacritice)

SET NAMES utf8mb4;
SET time_zone = '+00:00';

CREATE TABLE IF NOT EXISTS `utilizatori` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `nume_complet` VARCHAR(150) NOT NULL,
    `nume_companie` VARCHAR(150) NULL,
    `email` VARCHAR(191) NOT NULL UNIQUE,
    `telefon` VARCHAR(30) NULL,
    `parola_hash` VARCHAR(255) NOT NULL,
    `rol` ENUM('client', 'operator', 'admin') NOT NULL DEFAULT 'client',
    `creat_la` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `echipamente` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `cod_echipament` VARCHAR(50) NOT NULL UNIQUE,
    `nume` VARCHAR(200) NOT NULL,
    `categorie` VARCHAR(100) NOT NULL,
    `marca` VARCHAR(100) NOT NULL,
    `descriere` TEXT NULL,
    `imagine_url` VARCHAR(255) NULL,
    `pret_1_zi` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    `pret_weekend` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    `pret_7_zile` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    `garantie` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    `stoc_total` INT NOT NULL DEFAULT 1,
    `stoc_disponibil` INT NOT NULL DEFAULT 1,
    `status` ENUM('disponibil', 'indisponibil') NOT NULL DEFAULT 'disponibil',
    `creat_la` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `rezervari` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `cod_rezervare` VARCHAR(50) NOT NULL UNIQUE,
    `utilizator_id` INT NOT NULL,
    `data_ridicare` DATE NOT NULL,
    `data_predare` DATE NOT NULL,
    `observatii` TEXT NULL,
    `total_chirie` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    `total_garantie` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    `status` ENUM('in_asteptare', 'confirmata', 'predata', 'returnata', 'anulata') NOT NULL DEFAULT 'in_asteptare',
    `creat_la` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `fk_rezervari_utilizator` FOREIGN KEY (`utilizator_id`) REFERENCES `utilizatori` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `articole_rezervare` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `rezervare_id` INT NOT NULL,
    `echipament_id` INT NOT NULL,
    `tip_tarif` ENUM('1_zi', 'weekend', '7_zile') NOT NULL DEFAULT '1_zi',
    `cantitate` INT NOT NULL DEFAULT 1,
    `pret_unitar` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    `garantie_unitara` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    CONSTRAINT `fk_articole_rezervare` FOREIGN KEY (`rezervare_id`) REFERENCES `rezervari` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `fk_articole_echipament` FOREIGN KEY (`echipament_id`) REFERENCES `echipamente` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
