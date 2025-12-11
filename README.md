# Trouve ton artisan

Plateforme de mise en relation avec les artisans de la région Auvergne-Rhône-Alpes.

**Projet de formation** - Développeur Web et Web Mobile (CEF)

---

## 📋 Description

Application web permettant aux particuliers de trouver et contacter des artisans locaux par catégorie (Bâtiment, Services, Fabrication, Alimentation).

### Fonctionnalités

- 🔍 Recherche d'artisans par nom
- 📂 Navigation par catégories
- ⭐ Affichage des notes et avis
- 📧 Formulaire de contact
- 📱 Design responsive (mobile-first)
- ♿ Accessible (WCAG 2.1)

---

## 🛠️ Technologies utilisées

### Frontend
- **React** 19.0.0
- **React Router** 7.1.1
- **Bootstrap** 5.3.3
- **Sass** 1.83.0
- **Axios** 1.7.9
- **Vite** 7.2.7

### Backend
- **Node.js** (v20+)
- **Express** 4.21.2
- **Sequelize** 6.37.5
- **MySQL** / MariaDB
- **Helmet** (sécurité headers)
- **Express Rate Limit** (protection DDoS)
- **Express Validator** (validation inputs)

### Base de données
- **MySQL 8.0** / MariaDB
- 3 tables : `categories`, `specialites`, `artisans`
- 17 artisans répartis sur 4 catégories

---

## 📁 Structure du projet
```
trouve-ton-artisan/
├── backend/              # API REST Node.js
│   ├── config/          # Configuration BDD
│   ├── controllers/     # Logique métier
│   ├── middleware/      # Sécurité & validation
│   ├── models/          # Modèles Sequelize
│   ├── routes/          # Routes API
│   └── server.js        # Point d'entrée
├── frontend/            # Application React
│   ├── public/          # Assets statiques
│   └── src/
│       ├── components/  # Composants réutilisables
│       ├── pages/       # Pages de l'application
│       ├── services/    # Appels API
│       └── styles/      # SCSS global
├── database/            # Scripts SQL
│   ├── schema.sql       # Création des tables
│   └── seed.sql         # Données initiales
└── docs/                # Documentation
```

---

## 🚀 Installation

### Prérequis

- **Node.js** v20 ou supérieur
- **npm** v10 ou supérieur
- **MySQL** 8.0 ou **MariaDB** 10.6+
- **Git**

### 1. Cloner le projet
```bash
git clone https://github.com/votre-username/trouve-ton-artisan.git
cd trouve-ton-artisan
```

### 2. Configuration de la base de données
```bash
# Se connecter à MySQL
mysql -u root -p

# Créer la base de données
CREATE DATABASE trouve_ton_artisan CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE trouve_ton_artisan;

# Importer le schéma et les données
SOURCE database/schema.sql;
SOURCE database/seed.sql;

# Vérifier
SELECT COUNT(*) FROM artisans;  # Devrait retourner 17
EXIT;
```

### 3. Installation du backend
```bash
cd backend
npm install

# Créer le fichier .env
cat > .env << EOF
DB_HOST=localhost
DB_PORT=3306
DB_USER=votre_user_mysql
DB_PASS=votre_mot_de_passe
DB_NAME=trouve_ton_artisan

PORT=3000
NODE_ENV=development

FRONTEND_URL=http://localhost:5173
EOF

# Démarrer le serveur
npm run dev
```

Le serveur API démarre sur **http://localhost:3000**

### 4. Installation du frontend

**Dans un nouveau terminal :**
```bash
cd frontend
npm install

# Créer le fichier .env
cat > .env << EOF
VITE_API_URL=http://localhost:3000/api
EOF

# Démarrer l'application
npm run dev
```

L'application démarre sur **http://localhost:5173**

---

## 🔌 API Endpoints

### Catégories

- `GET /api/categories` - Liste toutes les catégories
- `GET /api/categories/:id` - Détails d'une catégorie

### Artisans

- `GET /api/artisans` - Liste tous les artisans
- `GET /api/artisans/:id` - Détails d'un artisan
- `GET /api/artisans/top` - Top 3 artisans du mois
- `GET /api/artisans/category/:categoryId` - Artisans par catégorie
- `GET /api/artisans/search?q=...` - Recherche par nom

### Exemple de réponse
```json
{
  "success": true,
  "data": [
    {
      "id": 4,
      "nom": "Chocolaterie Labbé",
      "email": "chocolaterie-labbe@gmail.com",
      "site_web": "https://chocolaterie-labbe.fr",
      "note": "4.9",
      "ville": "Lyon",
      "a_propos": "Lorem ipsum...",
      "top": true,
      "specialite": {
        "id": 4,
        "nom": "Chocolatier",
        "category": {
          "id": 1,
          "nom": "Alimentation"
        }
      }
    }
  ]
}
```

---

## 🔒 Sécurité

### Mesures implémentées

✅ **Helmet** - Headers HTTP sécurisés  
✅ **Rate Limiting** - 100 requêtes / 15 min (global), 20 requêtes / min (recherche)  
✅ **CORS** - Origine contrôlée  
✅ **Validation des inputs** - Express Validator  
✅ **Protection injection SQL** - Sequelize ORM  
✅ **Variables d'environnement** - Credentials sécurisés  

### À implémenter (production)

- [ ] HTTPS obligatoire
- [ ] JWT pour authentification admin
- [ ] Sanitization XSS
- [ ] CSP headers renforcés
- [ ] Logs de sécurité

---

## 🎨 Charte graphique

### Palette officielle Région Auvergne-Rhône-Alpes

| Couleur | Code Hex | Usage |
|---------|----------|-------|
| Blanc cassé | `#f1f8fc` | Fond alternatif |
| Bleu principal | `#00497c` | Boutons, titres |
| Bleu clair | `#0074c7` | Footer, accents |
| Charcoal | `#384050` | Texte secondaire |
| Rouge | `#cd2c2e` | Alertes |
| Vert | `#82b864` | Succès |

### Typographie

- **Police principale** : Inter (fallback système)
- **Police officielle** : Graphik (licence payante non incluse)

---

## 📱 Responsive Design

- **Mobile** : 320px - 767px
- **Tablette** : 768px - 1023px
- **Desktop** : 1024px+

Design mobile-first avec breakpoints Bootstrap.

---

## 🧪 Tests

### Tester l'API
```bash
# Vérifier que le serveur répond
curl http://localhost:3000

# Récupérer les catégories
curl http://localhost:3000/api/categories

# Récupérer le top 3
curl http://localhost:3000/api/artisans/top

# Rechercher un artisan
curl "http://localhost:3000/api/artisans/search?q=chocolat"
```

### Tester le frontend

1. Ouvrir http://localhost:5173
2. Naviguer entre les catégories
3. Cliquer sur une fiche artisan
4. Utiliser la recherche
5. Tester la page 404 : http://localhost:5173/test

---

## 📦 Build Production

### Backend
```bash
cd backend
npm start  # Lance avec node (pas nodemon)
```

### Frontend
```bash
cd frontend
npm run build  # Génère le dossier dist/

# Prévisualiser
npm run preview
```

---

## 🚀 Déploiement

### Backend (Render / Railway)

1. Créer un compte sur Render.com
2. Connecter le repository GitHub
3. Configurer les variables d'environnement
4. Déployer

### Frontend (Vercel / Netlify)

1. Créer un compte sur Vercel.com
2. Importer le projet depuis GitHub
3. Configurer `VITE_API_URL` vers l'URL de production
4. Déployer

### Base de données (PlanetScale / Railway)

Alternative : Utiliser un service MySQL managé

---

## 👤 Auteur

**Nicolas Lesieur**  
Projet de formation - Développeur Web et Web Mobile  
CEF (Centre Européen de Formation)

---

## 📄 Licence

Projet éducatif - Tous droits réservés

---
