# Modèle Logique de Données (MLD)

## Projet : Trouve ton artisan

---

## Schéma relationnel

### Table : categories
```sql
categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)
```

**Index :**
- PRIMARY KEY sur `id`
- UNIQUE sur `nom`

---

### Table : specialites
```sql
specialites (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    categorie_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (categorie_id) REFERENCES categories(id) ON DELETE CASCADE
)
```

**Index :**
- PRIMARY KEY sur `id`
- INDEX sur `categorie_id`

**Contraintes :**
- FOREIGN KEY `categorie_id` → `categories.id` (CASCADE)

---

### Table : artisans
```sql
artisans (
    id INT PRIMARY KEY AUTO_INCREMENT,
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
    FOREIGN KEY (specialite_id) REFERENCES specialites(id) ON DELETE CASCADE
)
```

**Index :**
- PRIMARY KEY sur `id`
- INDEX sur `specialite_id`
- INDEX sur `note`
- INDEX sur `top`

**Contraintes :**
- FOREIGN KEY `specialite_id` → `specialites.id` (CASCADE)
- CHECK `note` entre 0.0 et 5.0

---

## Normalisation

### Forme normale atteinte : 3NF (Troisième Forme Normale)

**Justification :**

✅ **1NF** : Tous les attributs sont atomiques (pas de valeurs multiples)

✅ **2NF** : Pas de dépendances partielles (toutes les clés primaires sont simples)

✅ **3NF** : Pas de dépendances transitives
- `artisan.specialite_id` → `specialite.nom`
- `specialite.categorie_id` → `categorie.nom`
- Chaque attribut non-clé dépend directement de la clé primaire

---

## Dictionnaire de données

### Table : categories

| Attribut | Type | Taille | Contraintes | Description |
|----------|------|--------|-------------|-------------|
| id | INT | - | PK, AUTO_INCREMENT | Identifiant unique |
| nom | VARCHAR | 100 | NOT NULL, UNIQUE | Nom de la catégorie |
| created_at | TIMESTAMP | - | DEFAULT CURRENT_TIMESTAMP | Date de création |
| updated_at | TIMESTAMP | - | DEFAULT + ON UPDATE | Date de modification |

### Table : specialites

| Attribut | Type | Taille | Contraintes | Description |
|----------|------|--------|-------------|-------------|
| id | INT | - | PK, AUTO_INCREMENT | Identifiant unique |
| nom | VARCHAR | 100 | NOT NULL | Nom de la spécialité |
| categorie_id | INT | - | FK, NOT NULL | Référence vers categories |
| created_at | TIMESTAMP | - | DEFAULT CURRENT_TIMESTAMP | Date de création |
| updated_at | TIMESTAMP | - | DEFAULT + ON UPDATE | Date de modification |

### Table : artisans

| Attribut | Type | Taille | Contraintes | Description |
|----------|------|--------|-------------|-------------|
| id | INT | - | PK, AUTO_INCREMENT | Identifiant unique |
| nom | VARCHAR | 255 | NOT NULL | Nom de l'artisan/entreprise |
| email | VARCHAR | 255 | NOT NULL | Email de contact |
| site_web | VARCHAR | 255 | NULL | URL du site web |
| note | DECIMAL | 2,1 | CHECK 0-5 | Note moyenne sur 5 |
| ville | VARCHAR | 100 | NOT NULL | Ville de l'artisan |
| a_propos | TEXT | - | NULL | Description de l'artisan |
| top | BOOLEAN | - | DEFAULT FALSE | Artisan du mois |
| specialite_id | INT | - | FK, NOT NULL | Référence vers specialites |
| created_at | TIMESTAMP | - | DEFAULT CURRENT_TIMESTAMP | Date de création |
| updated_at | TIMESTAMP | - | DEFAULT + ON UPDATE | Date de modification |

---

## Requêtes SQL types

### Récupérer tous les artisans d'une catégorie
```sql
SELECT a.*, s.nom AS specialite, c.nom AS categorie
FROM artisans a
JOIN specialites s ON a.specialite_id = s.id
JOIN categories c ON s.categorie_id = c.id
WHERE c.id = 1;
```

### Récupérer les 3 artisans du mois
```sql
SELECT *
FROM artisans
WHERE top = TRUE
ORDER BY note DESC
LIMIT 3;
```

### Rechercher un artisan par nom
```sql
SELECT a.*, s.nom AS specialite
FROM artisans a
JOIN specialites s ON a.specialite_id = s.id
WHERE a.nom LIKE '%chocolat%';
```

---

## Performance et optimisation

### Index créés

- **PRIMARY KEY** sur tous les `id` (automatique)
- **INDEX** sur `specialites.categorie_id` (jointures fréquentes)
- **INDEX** sur `artisans.specialite_id` (jointures fréquentes)
- **INDEX** sur `artisans.note` (tri/filtrage)
- **INDEX** sur `artisans.top` (requête "artisans du mois")

### Optimisations appliquées

- **InnoDB** : Support des transactions et clés étrangères
- **utf8mb4** : Support complet des caractères Unicode
- **ON DELETE CASCADE** : Maintien de l'intégrité référentielle automatique
- **Timestamps automatiques** : Traçabilité des modifications