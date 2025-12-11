-- ============================================
-- SEED DATA - TROUVE TON ARTISAN
-- ============================================

-- ============================================
-- INSERTION CATEGORIES
-- ============================================
INSERT INTO categories (nom) VALUES
('Alimentation'),
('Bâtiment'),
('Fabrication'),
('Services');

-- ============================================
-- INSERTION SPECIALITES
-- ============================================

-- Alimentation (categorie_id = 1)
INSERT INTO specialites (nom, categorie_id) VALUES
('Traiteur', 1),
('Boucher', 1),
('Boulanger', 1),
('Chocolatier', 1);

-- Bâtiment (categorie_id = 2)
INSERT INTO specialites (nom, categorie_id) VALUES
('Chauffagiste', 2),
('Électricien', 2),
('Menuisier', 2),
('Plombier', 2);

-- Fabrication (categorie_id = 3)
INSERT INTO specialites (nom, categorie_id) VALUES
('Bijoutier', 3),
('Couturier', 3),
('Ferronnier', 3);

-- Services (categorie_id = 4)
INSERT INTO specialites (nom, categorie_id) VALUES
('Coiffeur', 4),
('Fleuriste', 4),
('Toiletteur', 4),
('Webdesigner', 4);

-- ============================================
-- INSERTION ARTISANS (À COMPLÉTER AVEC TES DONNÉES EXCEL)
-- ============================================

-- ALIMENTATION (4 artisans)
-- Exemple structure - À adapter avec tes vraies données
INSERT INTO artisans (nom, email, site_web, note, ville, a_propos, top, specialite_id) VALUES
('Traiteur Truchon', 'contact@truchon-traiteur.fr', 'https://truchon-traiteur.fr', 4.1, 'Lyon', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', TRUE, 1),
('Boucherie Dumond', 'boucherie.dumond@gmail.com', NULL, 4.5, 'Lyon', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', FALSE, 2),
('Au Pain Chaud', 'aupainchaud@hotmail.com', NULL, 4.8, 'Montélimar', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', TRUE, 3),
('Chocolaterie Labbé', 'chocolaterie-labbe@gmail.com', 'https://chocolaterie-labbe.fr', 4.9, 'Lyon', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', TRUE, 4);

-- BÂTIMENT (4 artisans)
INSERT INTO artisans (nom, email, site_web, note, ville, a_propos, top, specialite_id) VALUES
('Orville Samons', 'o-salmons@live.com', NULL, 5.0, 'Évian', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', FALSE, 5),
('Mont Blanc Electricité', 'contact@mont-blanc-electricite.com', 'https://mont-blanc-electricite.fr', 4.5, 'Chamonix', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', FALSE, 6),
('Boutot & Fils', 'boutot-meunuiserie@gmail.com', 'https://boutot-meunuiserie.com', 4.7, 'Bourg-en-bresse', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', FALSE, 7),
('Vallis Bellemare', 'v.bellemare@gmail.com', 'https://plomberie-bellemare.fr', 4.0, 'Lyon', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', FALSE, 8);

-- FABRICATION (3 artisans)
INSERT INTO artisans (nom, email, site_web, note, ville, a_propos, top, specialite_id) VALUES
('Claude Quinn', 'claude.quinn@gmail.com', NULL, 4.2, 'Aix les bains', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', FALSE, 9),
('Amitee Lécuyer', 'a.amitee@hotmail.com', 'https://lecuyer-couture.com', 4.5, 'Lyon', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', FALSE, 10),
('Ernest Carigan', 'e-carigan@hotmail.com', NULL, 5.0, 'Lyon', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', FALSE, 11);

-- SERVICES (6 artisans dont 3 coiffeurs)
INSERT INTO artisans (nom, email, site_web, note, ville, a_propos, top, specialite_id) VALUES
('Royden Charbonneau', 'r.charbonneau@gmail.com', NULL, 3.8, 'Saint-Priest', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', FALSE, 12),
('Leala Dennis', 'l.dennis@hotmail.fr', 'https://coiffure-leala-chambery.fr', 3.8, 'Chambéry', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', FALSE, 12),
("C'est sup'hair", 'sup-hair@gmail.com', NULL, 4.1, 'Romans-sur-Isère', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', FALSE, 12),
('Fleurs & Nature', 'contact@fleurs-nature.fr', 'https://fleurs-nature.fr', 4.7, 'Lyon', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', FALSE, 13),
('Toilettage Canin', 'contact@toilettage-canin.fr', NULL, 4.2, 'Lyon', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', FALSE, 14),
('Studio Webdesign', 'contact@studio-webdesign.fr', 'https://studio-webdesign.fr', 4.8, 'Lyon', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', FALSE, 15);