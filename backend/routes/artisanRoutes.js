const express = require('express');
const router = express.Router();
const artisanController = require('../controllers/artisanController');
const { validateId, validateCategoryId, validateSearch } = require('../middleware/validator');
const { searchLimiter } = require('../middleware/security');

// GET /api/artisans/top - Les 3 artisans du mois (AVANT /:id)
router.get('/top', artisanController.getTopArtisans);

// GET /api/artisans/search?q=... - Recherche par nom (avec rate limiting spécifique)
router.get('/search', searchLimiter, validateSearch, artisanController.searchArtisans);

// GET /api/artisans/category/:categoryId - Artisans par catégorie
router.get('/category/:categoryId', validateCategoryId, artisanController.getArtisansByCategory);

// GET /api/artisans - Tous les artisans
router.get('/', artisanController.getAllArtisans);

// GET /api/artisans/:id - Un artisan par ID
router.get('/:id', validateId, artisanController.getArtisanById);

module.exports = router;