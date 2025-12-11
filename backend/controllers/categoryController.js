const { Category, Specialite } = require('../models');

// GET /api/categories - Récupérer toutes les catégories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{
        model: Specialite,
        as: 'specialites',
        attributes: ['id', 'nom']
      }],
      order: [['nom', 'ASC']]
    });

    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Erreur getAllCategories:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la récupération des catégories'
    });
  }
};

// GET /api/categories/:id - Récupérer une catégorie par ID
exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const category = await Category.findByPk(id, {
      include: [{
        model: Specialite,
        as: 'specialites',
        attributes: ['id', 'nom']
      }]
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Catégorie non trouvée'
      });
    }

    res.json({
      success: true,
      data: category
    });
  } catch (error) {
    console.error('Erreur getCategoryById:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
};