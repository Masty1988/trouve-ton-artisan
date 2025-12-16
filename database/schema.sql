SET NAMES utf8mb4;
-- ============================================
-- SCHEMA BASE DE DONNÉES - TROUVE TON ARTISAN
-- ============================================

-- Suppression des tables si elles existent (pour réinitialisation propre)
DROP TABLE IF EXISTS artisans;
DROP TABLE IF EXISTS specialites;
DROP TABLE IF EXISTS categories;

-- ============================================
-- TABLE CATEGORIES
-- ============================================
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE SPECIALITES
-- ============================================
CREATE TABLE specialites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    categorie_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (categorie_id) REFERENCES categories(id) ON DELETE CASCADE,
    INDEX idx_categorie (categorie_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE ARTISANS
-- ============================================
CREATE TABLE artisans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    site_web VARCHAR(255),
    note DECIMAL(2,1) CHECK (note >= 0 AND note <= 5),
    ville VARCHAR(100) NOT NULL,
    a_propos TEXT,
    top BOOLEAN DEFAULT FALSE,
    specialite_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (specialite_id) REFERENCES specialites(id) ON DELETE CASCADE,
    INDEX idx_specialite (specialite_id),
    INDEX idx_note (note),
    INDEX idx_top (top)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;