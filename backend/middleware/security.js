const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

// Rate limiting - Limite les requêtes par IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limite à 100 requêtes par fenêtre
  message: {
    success: false,
    message: 'Trop de requêtes depuis cette IP, réessayez dans 15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Rate limiting strict pour la recherche (évite le spam)
const searchLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20, // 20 recherches par minute max
  message: {
    success: false,
    message: 'Trop de recherches, réessayez dans 1 minute'
  }
});

// Configuration Helmet pour sécuriser les headers HTTP
const helmetConfig = helmet({
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
  limiter,
  searchLimiter,
  helmetConfig
};