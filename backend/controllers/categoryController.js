const { Category, Specialite } = require('../models');

// GET /api/categories - Récupérer toutes les catégories
exports.fetchAllCategories = async (req, res) => {
  try {
    const categoriesList = await Category.findAll({
      include: [{
        model: Specialite,
        as: 'specialites',
        attributes: ['id', 'nom']
      }],
      order: [['nom', 'ASC']]
    });

    res.json({
      success: true,
      data: categoriesList
    });
  } catch (err) {
    console.error('Erreur fetchAllCategories:', err);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la récupération des catégories'
    });
  }
};

// GET /api/categories/:id - Récupérer une catégorie par ID
exports.findCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const categoryData = await Category.findByPk(id, {
      include: [{
        model: Specialite,
        as: 'specialites',
        attributes: ['id', 'nom']
      }]
    });

    if (!categoryData) {
      return res.status(404).json({
        success: false,
        message: 'Catégorie non trouvée'
      });
    }

    res.json({
      success: true,
      data: categoryData
    });
  } catch (err) {
    console.error('Erreur findCategoryById:', err);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
};