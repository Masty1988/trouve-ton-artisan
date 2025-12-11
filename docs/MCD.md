# Modèle Conceptuel de Données (MCD)

## Projet : Trouve ton artisan

---

## Entités et attributs

### CATEGORIE
- **id** (Clé primaire)
- nom
- created_at
- updated_at

### SPECIALITE
- **id** (Clé primaire)
- nom
- categorie_id (Clé étrangère → CATEGORIE)
- created_at
- updated_at

### ARTISAN
- **id** (Clé primaire)
- nom
- email
- site_web
- note
- ville
- a_propos
- top (booléen)
- specialite_id (Clé étrangère → SPECIALITE)
- created_at
- updated_at

---

## Relations

### CATEGORIE ↔ SPECIALITE
- **Type** : 1:N (One-to-Many)
- **Cardinalité** : Une catégorie possède plusieurs spécialités
- **Règle métier** : Une spécialité appartient à une seule catégorie

### SPECIALITE ↔ ARTISAN
- **Type** : 1:N (One-to-Many)
- **Cardinalité** : Une spécialité regroupe plusieurs artisans
- **Règle métier** : Un artisan est associé à une seule spécialité

---

## Représentation textuelle
```
CATEGORIE (id, nom, created_at, updated_at)
    |
    | 1:N
    v
SPECIALITE (id, nom, #categorie_id, created_at, updated_at)
    |
    | 1:N
    v
ARTISAN (id, nom, email, site_web, note, ville, a_propos, top, #specialite_id, created_at, updated_at)
```

**Légende :**
- `#` = Clé étrangère
- `1:N` = Relation un-à-plusieurs

---

## Contraintes d'intégrité

### Clés primaires
- Toutes les entités possèdent une clé primaire auto-incrémentée

### Clés étrangères
- `specialite.categorie_id` → `categorie.id` (ON DELETE CASCADE)
- `artisan.specialite_id` → `specialite.id` (ON DELETE CASCADE)

### Contraintes métier
- `artisan.note` : DECIMAL(2,1) entre 0.0 et 5.0
- `artisan.top` : BOOLEAN (false par défaut)
- `artisan.email` : NOT NULL
- `categorie.nom` : UNIQUE

---

## Volumétrie

| Table | Nombre d'enregistrements |
|-------|-------------------------|
| CATEGORIE | 4 |
| SPECIALITE | 15 |
| ARTISAN | 17 |

---

## Règles de gestion

1. Une catégorie peut exister sans spécialité
2. Une spécialité doit obligatoirement être rattachée à une catégorie
3. Un artisan doit obligatoirement avoir une spécialité
4. La suppression d'une catégorie supprime toutes ses spécialités (CASCADE)
5. La suppression d'une spécialité supprime tous ses artisans (CASCADE)
6. Un artisan peut être marqué comme "artisan du mois" (top = true)
7. Maximum 3 artisans peuvent être "top" simultanément (règle applicative)