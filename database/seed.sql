SET NAMES utf8mb4;


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
-- INSERTION ARTISANS
-- ============================================

-- ALIMENTATION (4 artisans)

INSERT INTO artisans (nom, email, site_web, note, ville, a_propos, top, specialite_id) VALUES
('Traiteur Truchon', 'contact@truchon-traiteur.fr', 'https://truchon-traiteur.fr', 4.1, 'Lyon', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque justo enim, ultrices vitae augue eget, commodo pulvinar sapien. Mauris purus nunc, lobortis sit amet odio ut, iaculis pretium sapien. Nam efficitur, risus sit amet aliquam tempor, lorem turpis aliquam neque, eu convallis odio justo id tellus. Sed justo massa, vestibulum aliquet sem eu, cursus viverra libero. Nunc pretium dictum auctor. Etiam ultrices justo efficitur, sodales mi pharetra, tristique massa. Donec neque nulla, pulvinar quis vulputate sed, tempor nec enim. Cras in ornare mi, a suscipit nulla. Donec lorem massa, viverra ac ornare sit amet, convallis bibendum purus. Pellentesque justo enim, ultrices vitae augue eget, commodo pulvinar sapien. Mauris purus nunc, lobortis sit amet odio ut, iaculis pretium sapien. Nam efficitur, risus sit amet aliquam tempor, lorem turpis aliquam neque, eu convallis odio justo id tellus. Sed justo massa, vestibulum aliquet sem eu, cursus viverra libero. Nunc pretium dictum auctor. Etiam ultrices justo efficitur, sodales mi pharetra, tristique massa. Donec neque nulla, pulvinar quis vulputate sed, tempor nec enim. Cras in ornare mi, a suscipit nulla. Donec lorem massa, viverra ac ornare sit amet, convallis bibendum purus.', FALSE, 1),
('Boucherie Dumond', 'boucherie.dumond@gmail.com', NULL, 4.5, 'Lyon', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque justo enim, ultrices vitae augue eget, commodo pulvinar sapien. Mauris purus nunc, lobortis sit amet odio ut, iaculis pretium sapien. Nam efficitur, risus sit amet aliquam tempor, lorem turpis aliquam neque, eu convallis odio justo id tellus. Sed justo massa, vestibulum aliquet sem eu, cursus viverra libero. Nunc pretium dictum auctor. Etiam ultrices justo efficitur, sodales mi pharetra, tristique massa. Donec neque nulla, pulvinar quis vulputate sed, tempor nec enim. Cras in ornare mi, a suscipit nulla. Donec lorem massa, viverra ac ornare sit amet, convallis bibendum purus.', FALSE, 2),
('Au Pain Chaud', 'aupainchaud@hotmail.com', NULL, 4.8, 'Montélimar', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque justo enim, ultrices vitae augue eget, commodo pulvinar sapien. Mauris purus nunc, lobortis sit amet odio ut, iaculis pretium sapien. Nam efficitur, risus sit amet aliquam tempor, lorem turpis aliquam neque, eu convallis odio justo id tellus. Sed justo massa, vestibulum aliquet sem eu, cursus viverra libero. Nunc pretium dictum auctor. Etiam ultrices justo efficitur, sodales mi pharetra, tristique massa. Donec neque nulla, pulvinar quis vulputate sed, tempor nec enim. Cras in ornare mi, a suscipit nulla. Donec lorem massa, viverra ac ornare sit amet, convallis bibendum purus.', TRUE, 3),
('Chocolaterie Labbé', 'chocolaterie-labbe@gmail.com', 'https://chocolaterie-labbe.fr', 4.9, 'Lyon', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque justo enim, ultrices vitae augue eget, commodo pulvinar sapien. Mauris purus nunc, lobortis sit amet odio ut, iaculis pretium sapien. Nam efficitur, risus sit amet aliquam tempor, lorem turpis aliquam neque, eu convallis odio justo id tellus. Sed justo massa, vestibulum aliquet sem eu, cursus viverra libero. Nunc pretium dictum auctor. Etiam ultrices justo efficitur, sodales mi pharetra, tristique massa. Donec neque nulla, pulvinar quis vulputate sed, tempor nec enim. Cras in ornare mi, a suscipit nulla. Donec lorem massa, viverra ac ornare sit amet, convallis bibendum purus.', TRUE, 4);

-- BÂTIMENT (4 artisans)
INSERT INTO artisans (nom, email, site_web, note, ville, a_propos, top, specialite_id) VALUES
('Orville Samons', 'o-salmons@live.com', NULL, 5.0, 'Évian', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque justo enim, ultrices vitae augue eget, commodo pulvinar sapien. Mauris purus nunc, lobortis sit amet odio ut, iaculis pretium sapien. Nam efficitur, risus sit amet aliquam tempor, lorem turpis aliquam neque, eu convallis odio justo id tellus. Sed justo massa, vestibulum aliquet sem eu, cursus viverra libero. Nunc pretium dictum auctor. Etiam ultrices justo efficitur, sodales mi pharetra, tristique massa. Donec neque nulla, pulvinar quis vulputate sed, tempor nec enim. Cras in ornare mi, a suscipit nulla. Donec lorem massa, viverra ac ornare sit amet, convallis bibendum purus.', TRUE, 5),
('Mont Blanc Electricité', 'contact@mont-blanc-electricite.com', 'https://mont-blanc-electricite.fr', 4.5, 'Chamonix', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque justo enim, ultrices vitae augue eget, commodo pulvinar sapien. Mauris purus nunc, lobortis sit amet odio ut, iaculis pretium sapien. Nam efficitur, risus sit amet aliquam tempor, lorem turpis aliquam neque, eu convallis odio justo id tellus. Sed justo massa, vestibulum aliquet sem eu, cursus viverra libero. Nunc pretium dictum auctor. Etiam ultrices justo efficitur, sodales mi pharetra, tristique massa. Donec neque nulla, pulvinar quis vulputate sed, tempor nec enim. Cras in ornare mi, a suscipit nulla. Donec lorem massa, viverra ac ornare sit amet, convallis bibendum purus. Pellentesque justo enim, ultrices vitae augue eget, commodo pulvinar sapien. Mauris purus nunc, lobortis sit amet odio ut, iaculis pretium sapien. Nam efficitur, risus sit amet aliquam tempor, lorem turpis aliquam neque, eu convallis odio justo id tellus. Sed justo massa, vestibulum aliquet sem eu, cursus viverra libero. Nunc pretium dictum auctor. Etiam ultrices justo efficitur, sodales mi pharetra, tristique massa. Donec neque nulla, pulvinar quis vulputate sed, tempor nec enim. Cras in ornare mi, a suscipit nulla. Donec lorem massa, viverra ac ornare sit amet, convallis bibendum purus.', FALSE, 6),
('Boutot & Fils', 'boutot-meunuiserie@gmail.com', 'https://boutot-meunuiserie.com', 4.7, 'Bourg-en-bresse', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque justo enim, ultrices vitae augue eget, commodo pulvinar sapien. Mauris purus nunc, lobortis sit amet odio ut, iaculis pretium sapien. Nam efficitur, risus sit amet aliquam tempor, lorem turpis aliquam neque, eu convallis odio justo id tellus. Sed justo massa, vestibulum aliquet sem eu, cursus viverra libero. Nunc pretium dictum auctor. Etiam ultrices justo efficitur, sodales mi pharetra, tristique massa. Donec neque nulla, pulvinar quis vulputate sed, tempor nec enim. Cras in ornare mi, a suscipit nulla. Donec lorem massa, viverra ac ornare sit amet, convallis bibendum purus.', FALSE, 7),
('Vallis Bellemare', 'v.bellemare@gmail.com', 'https://plomberie-bellemare.fr', 4.0, 'Lyon', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque justo enim, ultrices vitae augue eget, commodo pulvinar sapien. Mauris purus nunc, lobortis sit amet odio ut, iaculis pretium sapien. Nam efficitur, risus sit amet aliquam tempor, lorem turpis aliquam neque, eu convallis odio justo id tellus. Sed justo massa, vestibulum aliquet sem eu, cursus viverra libero. Nunc pretium dictum auctor. Etiam ultrices justo efficitur, sodales mi pharetra, tristique massa. Donec neque nulla, pulvinar quis vulputate sed, tempor nec enim. Cras in ornare mi, a suscipit nulla. Donec lorem massa, viverra ac ornare sit amet, convallis bibendum purus.', FALSE, 8);

-- FABRICATION (3 artisans)
INSERT INTO artisans (nom, email, site_web, note, ville, a_propos, top, specialite_id) VALUES
('Claude Quinn', 'claude.quinn@gmail.com', NULL, 4.2, 'Aix les bains', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque justo enim, ultrices vitae augue eget, commodo pulvinar sapien. Mauris purus nunc, lobortis sit amet odio ut, iaculis pretium sapien. Nam efficitur, risus sit amet aliquam tempor, lorem turpis aliquam neque, eu convallis odio justo id tellus. Sed justo massa, vestibulum aliquet sem eu, cursus viverra libero. Nunc pretium dictum auctor. Etiam ultrices justo efficitur, sodales mi pharetra, tristique massa. Donec neque nulla, pulvinar quis vulputate sed, tempor nec enim. Cras in ornare mi, a suscipit nulla. Donec lorem massa, viverra ac ornare sit amet, convallis bibendum purus.', FALSE, 9),
('Amitee Lécuyer', 'a.amitee@hotmail.com', 'https://lecuyer-couture.com', 4.5, 'Lyon', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque justo enim, ultrices vitae augue eget, commodo pulvinar sapien. Mauris purus nunc, lobortis sit amet odio ut, iaculis pretium sapien. Nam efficitur, risus sit amet aliquam tempor, lorem turpis aliquam neque, eu convallis odio justo id tellus. Sed justo massa, vestibulum aliquet sem eu, cursus viverra libero. Nunc pretium dictum auctor. Etiam ultrices justo efficitur, sodales mi pharetra, tristique massa. Donec neque nulla, pulvinar quis vulputate sed, tempor nec enim. Cras in ornare mi, a suscipit nulla. Donec lorem massa, viverra ac ornare sit amet, convallis bibendum purus.', FALSE, 10),
('Ernest Carigan', 'e-carigan@hotmail.com', NULL, 5.0, 'Lyon', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque justo enim, ultrices vitae augue eget, commodo pulvinar sapien. Mauris purus nunc, lobortis sit amet odio ut, iaculis pretium sapien. Nam efficitur, risus sit amet aliquam tempor, lorem turpis aliquam neque, eu convallis odio justo id tellus. Sed justo massa, vestibulum aliquet sem eu, cursus viverra libero. Nunc pretium dictum auctor. Etiam ultrices justo efficitur, sodales mi pharetra, tristique massa. Donec neque nulla, pulvinar quis vulputate sed, tempor nec enim. Cras in ornare mi, a suscipit nulla. Donec lorem massa, viverra ac ornare sit amet, convallis bibendum purus.', FALSE, 11);

-- SERVICES (6 artisans dont 3 coiffeurs)
INSERT INTO artisans (nom, email, site_web, note, ville, a_propos, top, specialite_id) VALUES
('Royden Charbonneau', 'r.charbonneau@gmail.com', NULL, 3.8, 'Saint-Priest', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque justo enim, ultrices vitae augue eget, commodo pulvinar sapien. Mauris purus nunc, lobortis sit amet odio ut, iaculis pretium sapien. Nam efficitur, risus sit amet aliquam tempor, lorem turpis aliquam neque, eu convallis odio justo id tellus. Sed justo massa, vestibulum aliquet sem eu, cursus viverra libero. Nunc pretium dictum auctor. Etiam ultrices justo efficitur, sodales mi pharetra, tristique massa. Donec neque nulla, pulvinar quis vulputate sed, tempor nec enim. Cras in ornare mi, a suscipit nulla. Donec lorem massa, viverra ac ornare sit amet, convallis bibendum purus.', FALSE, 12),
('Leala Dennis', 'l.dennis@hotmail.fr', 'https://coiffure-leala-chambery.fr', 3.8, 'Chambéry', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque justo enim, ultrices vitae augue eget, commodo pulvinar sapien. Mauris purus nunc, lobortis sit amet odio ut, iaculis pretium sapien. Nam efficitur, risus sit amet aliquam tempor, lorem turpis aliquam neque, eu convallis odio justo id tellus. Sed justo massa, vestibulum aliquet sem eu, cursus viverra libero. Nunc pretium dictum auctor. Etiam ultrices justo efficitur, sodales mi pharetra, tristique massa. Donec neque nulla, pulvinar quis vulputate sed, tempor nec enim. Cras in ornare mi, a suscipit nulla. Donec lorem massa, viverra ac ornare sit amet, convallis bibendum purus.', FALSE, 12),
("C'est sup'hair", 'sup-hair@gmail.com', NULL, 4.1, 'Romans-sur-Isère', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque justo enim, ultrices vitae augue eget, commodo pulvinar sapien. Mauris purus nunc, lobortis sit amet odio ut, iaculis pretium sapien. Nam efficitur, risus sit amet aliquam tempor, lorem turpis aliquam neque, eu convallis odio justo id tellus. Sed justo massa, vestibulum aliquet sem eu, cursus viverra libero. Nunc pretium dictum auctor. Etiam ultrices justo efficitur, sodales mi pharetra, tristique massa. Donec neque nulla, pulvinar quis vulputate sed, tempor nec enim. Cras in ornare mi, a suscipit nulla. Donec lorem massa, viverra ac ornare sit amet, convallis bibendum purus.', FALSE, 12),
('Le monde des fleurs', 'contact@le-monde-des-fleurs-annonay.fr', 'https://le-monde-des-fleurs-annonay.fr', 4.6, 'Annonay', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque justo enim, ultrices vitae augue eget, commodo pulvinar sapien. Mauris purus nunc, lobortis sit amet odio ut, iaculis pretium sapien. Nam efficitur, risus sit amet aliquam tempor, lorem turpis aliquam neque, eu convallis odio justo id tellus. Sed justo massa, vestibulum aliquet sem eu, cursus viverra libero. Nunc pretium dictum auctor. Etiam ultrices justo efficitur, sodales mi pharetra, tristique massa. Donec neque nulla, pulvinar quis vulputate sed, tempor nec enim. Cras in ornare mi, a suscipit nulla. Donec lorem massa, viverra ac ornare sit amet, convallis bibendum purus.', FALSE, 13),
('Valérie Laderoute', 'v-laredoute@gmail.com', NULL, 4.5, 'Valence', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque justo enim, ultrices vitae augue eget, commodo pulvinar sapien. Mauris purus nunc, lobortis sit amet odio ut, iaculis pretium sapien. Nam efficitur, risus sit amet aliquam tempor, lorem turpis aliquam neque, eu convallis odio justo id tellus. Sed justo massa, vestibulum aliquet sem eu, cursus viverra libero. Nunc pretium dictum auctor. Etiam ultrices justo efficitur, sodales mi pharetra, tristique massa. Donec neque nulla, pulvinar quis vulputate sed, tempor nec enim. Cras in ornare mi, a suscipit nulla. Donec lorem massa, viverra ac ornare sit amet, convallis bibendum purus.', FALSE, 14),
('CM Graphisme', 'contact@cm-graphisme.com', 'https://cm-graphisme.com', 4.4, 'Valence', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque justo enim, ultrices vitae augue eget, commodo pulvinar sapien. Mauris purus nunc, lobortis sit amet odio ut, iaculis pretium sapien. Nam efficitur, risus sit amet aliquam tempor, lorem turpis aliquam neque, eu convallis odio justo id tellus. Sed justo massa, vestibulum aliquet sem eu, cursus viverra libero. Nunc pretium dictum auctor. Etiam ultrices justo efficitur, sodales mi pharetra, tristique massa. Donec neque nulla, pulvinar quis vulputate sed, tempor nec enim. Cras in ornare mi, a suscipit nulla. Donec lorem massa, viverra ac ornare sit amet, convallis bibendum purus.', FALSE, 15);