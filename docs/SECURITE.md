# Mesures de sécurité implémentées

## Projet : Trouve ton artisan

---

## 1. Sécurité des headers HTTP (Helmet)

### Implémentation
```javascript
const helmet = require('helmet');
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", 'data:', 'https:']
    }
  }
}));
```

### Protection apportée

✅ **X-Content-Type-Options** : Empêche le MIME sniffing  
✅ **X-Frame-Options** : Protection contre le clickjacking  
✅ **X-XSS-Protection** : Filtre XSS du navigateur activé  
✅ **Strict-Transport-Security** : Force HTTPS  
✅ **Content-Security-Policy** : Limite les sources de contenu

### Intérêt

Protège contre les attaques XSS, clickjacking et injection de code malveillant.

---

## 2. Rate Limiting (Protection DDoS)

### Implémentation
```javascript
const rateLimit = require('express-rate-limit');

// Rate limiting global
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requêtes max
  message: 'Trop de requêtes, réessayez dans 15 minutes'
});

// Rate limiting recherche (plus strict)
const searchLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20 // 20 recherches max
});
```

### Protection apportée

✅ Limite les abus (scraping, brute force)  
✅ Protège contre les attaques DDoS  
✅ Réduit la charge serveur

### Intérêt

Empêche un attaquant de surcharger l'API avec des milliers de requêtes.

---

## 3. Validation des inputs (Express Validator)

### Implémentation
```javascript
const { param, query, validationResult } = require('express-validator');

// Validation ID
const validateId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('L\'ID doit être un nombre entier positif'),
  validate
];

// Validation recherche
const validateSearch = [
  query('q')
    .trim()
    .isLength({ min: 2, max: 100 })
    .matches(/^[a-zA-Z0-9àâäéèêëïîôùûüÿçÀÂÄÉÈÊËÏÎÔÙÛÜŸÇ\s\-']+$/)
    .withMessage('Caractères non autorisés'),
  validate
];
```

### Protection apportée

✅ **Sanitization** : Nettoyage des entrées utilisateur  
✅ **Validation de type** : S'assure que les IDs sont bien des entiers  
✅ **Whitelist de caractères** : Bloque les caractères malveillants  
✅ **Limitation de longueur** : Évite les payloads trop longs

### Intérêt

Protège contre les injections SQL, XSS et les données malformées.

---

## 4. Protection injection SQL (Sequelize ORM)

### Implémentation
```javascript
const { Sequelize } = require('sequelize');

// Requêtes paramétrées automatiques
const artisan = await Artisan.findByPk(id);

// Recherche sécurisée
const artisans = await Artisan.findAll({
  where: {
    nom: {
      [Op.like]: `%${query}%`  // Paramétrisé par Sequelize
    }
  }
});
```

### Protection apportée

✅ **Parameterized queries** : Pas de concaténation SQL directe  
✅ **Échappement automatique** : Les valeurs sont sécurisées  
✅ **ORM** : Abstraction de la base de données

### Intérêt

Élimine les risques d'injection SQL (ex: `' OR '1'='1`).

---

## 5. CORS (Cross-Origin Resource Sharing)

### Implémentation
```javascript
const cors = require('cors');

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
```

### Protection apportée

✅ **Origine contrôlée** : Seul le frontend autorisé peut appeler l'API  
✅ **Credentials** : Support des cookies sécurisés

### Intérêt

Empêche les sites malveillants de faire des requêtes vers l'API.

---

## 6. Variables d'environnement (.env)

### Implémentation
```bash
# .env (jamais commité sur Git)
DB_HOST=localhost
DB_USER=artisan_user
DB_PASS=mot_de_passe_fort
DB_NAME=trouve_ton_artisan
```

### Protection apportée

✅ **Credentials séparés** : Pas de mots de passe dans le code  
✅ **.gitignore** : Fichier .env non versionné

### Intérêt

Évite l'exposition des credentials si le code source est compromis.

---

## 7. Gestion des erreurs

### Implémentation
```javascript
// Middleware de gestion d'erreurs
app.use((err, req, res, next) => {
  console.error('Erreur serveur:', err);
  res.status(500).json({
    success: false,
    message: 'Erreur interne du serveur'
    // NE PAS exposer err.message en production
  });
});
```

### Protection apportée

✅ **Pas d'exposition des détails** : Messages génériques  
✅ **Logs serveur** : Traçabilité pour le debugging

### Intérêt

Empêche un attaquant d'obtenir des informations sur la structure interne.

---

## 8. Logging sécurisé

### Implémentation
```javascript
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});
```

### Protection apportée

✅ **Traçabilité** : Logs des requêtes  
✅ **Détection d'anomalies** : Repérage d'activité suspecte

### Intérêt

Permet d'identifier des tentatives d'attaque dans les logs.

---

## Résumé des vulnérabilités couvertes

| Vulnérabilité | Protection | Niveau |
|---------------|------------|--------|
| Injection SQL | Sequelize ORM + Validation | ✅ Haute |
| XSS | Helmet + CSP + Sanitization | ✅ Haute |
| CSRF | SameSite cookies (à implémenter) | ⚠️ Moyenne |
| DDoS | Rate limiting | ✅ Haute |
| Brute force | Rate limiting + Logs | ✅ Moyenne |
| Clickjacking | X-Frame-Options | ✅ Haute |
| MIME sniffing | X-Content-Type-Options | ✅ Haute |
| Credentials exposure | Variables d'environnement | ✅ Haute |

---

## Améliorations recommandées (production)

- [ ] **HTTPS obligatoire** (certificat SSL/TLS)
- [ ] **Authentification JWT** pour les routes admin
- [ ] **Hashing bcrypt** pour les mots de passe (si ajout d'auth)
- [ ] **Logs centralisés** (Winston + service externe)
- [ ] **Monitoring** (Sentry, LogRocket)
- [ ] **WAF** (Web Application Firewall)
- [ ] **Audit de sécurité** régulier