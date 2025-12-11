const { param, query, validationResult } = require('express-validator');

// Middleware pour vérifier les erreurs de validation
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Données invalides',
      errors: errors.array()
    });
  }
  next();
};

// Validation pour les ID (doivent être des entiers positifs)
const validateId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('L\'ID doit être un nombre entier positif'),
  validate
];

const validateCategoryId = [
  param('categoryId')
    .isInt({ min: 1 })
    .withMessage('L\'ID de catégorie doit être un nombre entier positif'),
  validate
];

// Validation pour la recherche
const validateSearch = [
  query('q')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('La recherche doit contenir entre 2 et 100 caractères')
    .matches(/^[a-zA-Z0-9àâäéèêëïîôùûüÿçÀÂÄÉÈÊËÏÎÔÙÛÜŸÇ\s\-']+$/)
    .withMessage('La recherche contient des caractères non autorisés'),
  validate
];

module.exports = {
  validateId,
  validateCategoryId,
  validateSearch
};