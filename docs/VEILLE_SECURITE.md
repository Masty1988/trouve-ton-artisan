# Veille sur les vulnérabilités de sécurité

## Projet : Trouve ton artisan

---

## Méthodologie de veille

### Sources consultées

1. **OWASP Top 10** (2021) - https://owasp.org/Top10/
2. **CVE Database** - https://cve.mitre.org/
3. **npm audit** - Scan automatique des dépendances
4. **GitHub Security Advisories**
5. **Snyk Vulnerability Database**

### Fréquence

- Veille hebdomadaire pendant le développement
- Scan `npm audit` avant chaque commit
- Mise à jour des dépendances mensuelle

---

## Vulnérabilités identifiées et corrigées

### 1. Injection SQL (OWASP A03:2021)

**Description :**  
Risque d'injection SQL si les requêtes sont construites par concaténation de chaînes.

**Exemple d'attaque :**
```sql
SELECT * FROM artisans WHERE nom = '' OR '1'='1' --'
```

**Correction appliquée :**  
✅ Utilisation de Sequelize ORM avec requêtes paramétrées  
✅ Validation stricte des inputs avec Express Validator

**Statut :** ✅ Corrigé

---

### 2. Cross-Site Scripting (XSS) (OWASP A03:2021)

**Description :**  
Injection de scripts malveillants dans les champs texte (nom, description).

**Exemple d'attaque :**
```html
<script>alert('XSS')</script>
```

**Correction appliquée :**  
✅ Helmet avec Content-Security-Policy  
✅ React échappe automatiquement les données (dangerouslySetInnerHTML non utilisé)  
✅ Validation des caractères autorisés (regex whitelist)

**Statut :** ✅ Corrigé

---

### 3. Broken Access Control (OWASP A01:2021)

**Description :**  
Accès non autorisé aux ressources (modification/suppression d'artisans).

**Correction appliquée :**  
⚠️ API en lecture seule (GET uniquement)  
⚠️ Pas de routes POST/PUT/DELETE exposées  
🔄 Authentification JWT à implémenter pour admin

**Statut :** ⚠️ Partiellement corrigé (pas de modification possible actuellement)

---

### 4. Cryptographic Failures (OWASP A02:2021)

**Description :**  
Transmission de données sensibles en clair (passwords, tokens).

**Correction appliquée :**  
✅ Variables d'environnement pour credentials BDD  
✅ Pas de stockage de mots de passe (pas d'auth utilisateur)  
🔄 HTTPS à activer en production

**Statut :** ⚠️ À finaliser en production (certificat SSL)

---

### 5. Security Misconfiguration (OWASP A05:2021)

**Description :**  
Messages d'erreur trop verbeux exposant la structure interne.

**Correction appliquée :**  
✅ Gestion d'erreurs centralisée  
✅ Messages génériques côté client  
✅ Logs détaillés uniquement côté serveur  
✅ `NODE_ENV=production` masque les stack traces

**Statut :** ✅ Corrigé

---

### 6. Vulnerable and Outdated Components (OWASP A06:2021)

**Description :**  
Dépendances npm avec vulnérabilités connues.

**Audit npm (11 décembre 2024) :**
```bash
$ npm audit
found 0 vulnerabilities
```

**Dépendances critiques surveillées :**
- `express` : 4.21.2 (dernière version stable)
- `sequelize` : 6.37.5 (dernière version stable)
- `react` : 19.0.0 (dernière version)
- `axios` : 1.7.9 (dernière version)

**Correction appliquée :**  
✅ Toutes les dépendances à jour  
✅ `npm audit fix` exécuté régulièrement  
✅ Pas de dépendances avec vulnérabilités critiques

**Statut :** ✅ Corrigé

---

### 7. Identification and Authentication Failures (OWASP A07:2021)

**Description :**  
Absence d'authentification pour les opérations sensibles.

**Correction appliquée :**  
🔄 Pas d'authentification nécessaire actuellement (API lecture seule)  
🔄 À implémenter si ajout de fonctionnalités admin

**Statut :** 🔄 Non applicable (pas de fonctionnalités admin)

---

### 8. Server-Side Request Forgery (SSRF) (OWASP A10:2021)

**Description :**  
L'API pourrait être utilisée pour faire des requêtes vers des services internes.

**Correction appliquée :**  
✅ Pas de paramètre URL dans les requêtes API  
✅ Validation stricte des inputs  
✅ Pas de fetch/axios côté serveur avec input utilisateur

**Statut :** ✅ Corrigé

---

## Vulnérabilités non applicables

### 9. Insecure Design (OWASP A04:2021)

**Non applicable :** Architecture simple lecture seule, pas de logique métier complexe.

### 10. Software and Data Integrity Failures (OWASP A08:2021)

**Non applicable :** Pas de CI/CD avec risques de compromission de pipeline.

### 11. Security Logging and Monitoring Failures (OWASP A09:2021)

**Partiellement applicable :**  
✅ Logs des requêtes  
⚠️ Pas de système d'alertes automatisé  
🔄 À améliorer avec Winston + service externe

---

## Actions de veille continue

### Automatisation
```bash
# Audit des dépendances (avant chaque commit)
npm audit

# Mise à jour des dépendances mineures
npm update

# Vérification des vulnérabilités critiques
npm audit --audit-level=high
```

### Checklist mensuelle

- [ ] Consulter OWASP Top 10 pour nouvelles entrées
- [ ] Vérifier les CVE liées à Node.js, Express, React
- [ ] Scanner avec `npm audit`
- [ ] Mettre à jour les dépendances non-breaking
- [ ] Tester après mises à jour

---

## Ressources et références

### Documentation consultée

1. **OWASP Top 10 2021** - https://owasp.org/Top10/
2. **Node.js Security Best Practices** - https://nodejs.org/en/docs/guides/security/
3. **Express Security Best Practices** - https://expressjs.com/en/advanced/best-practice-security.html
4. **React Security** - https://react.dev/learn/security
5. **Sequelize Security** - https://sequelize.org/docs/v6/other-topics/security/

### Outils utilisés

- `npm audit` - Scan vulnérabilités dépendances
- Helmet.js - Sécurisation headers HTTP
- Express Rate Limit - Protection DDoS
- Express Validator - Validation inputs

---

## Conclusion

### Niveau de sécurité actuel

| Critère | État | Score |
|---------|------|-------|
| Protection injection | ✅ Excellent | 10/10 |
| Protection XSS | ✅ Excellent | 10/10 |
| Rate limiting | ✅ Bon | 9/10 |
| Gestion erreurs | ✅ Bon | 8/10 |
| HTTPS/SSL | ⚠️ À implémenter | 0/10 |
| Authentification | 🔄 Non applicable | N/A |
| Monitoring | ⚠️ Basique | 5/10 |

**Score global : 8/10** pour une API en lecture seule.

### Recommandations pour la production

1. **Priorité haute** : Certificat SSL/TLS (HTTPS)
2. **Priorité moyenne** : Monitoring centralisé
3. **Priorité basse** : Authentification admin (si fonctionnalités ajoutées)

**La veille de sécurité doit être continue et systématique.**