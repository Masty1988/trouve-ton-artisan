const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { validateId } = require('../middleware/validator');

// GET /api/categories - Toutes les catégories
router.get('/', categoryController.getAllCategories);

// GET /api/categories/:id - Une catégorie par ID
router.get('/:id', validateId, categoryController.getCategoryById);

module.exports = router;