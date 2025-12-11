const express = require('express');
const router = express.Router();

const categoryRoutes = require('./categoryRoutes');
const artisanRoutes = require('./artisanRoutes');

// Routes principales
router.use('/categories', categoryRoutes);
router.use('/artisans', artisanRoutes);

module.exports = router;