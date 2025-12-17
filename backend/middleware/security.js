const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

// Limitation générale des requêtes par IP
const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limite à 100 requêtes par fenêtre
  message: {
    success: false,
    message: 'Trop de requêtes depuis cette IP, réessayez dans 15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Limitation stricte pour les recherches (éviter le spam)
const searchRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20, // 20 recherches par minute max
  message: {
    success: false,
    message: 'Trop de recherches, réessayez dans 1 minute'
  }
});

// Configuration des headers HTTP sécurisés avec Helmet
const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", 'data:', 'https:']
    }
  },
  crossOriginEmbedderPolicy: false
});

module.exports = {
  rateLimiter,
  searchRateLimiter,
  securityHeaders
};