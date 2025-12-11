const { Artisan, Specialite, Category } = require('../models');
const { Op } = require('sequelize');

// GET /api/artisans - Récupérer tous les artisans
exports.getAllArtisans = async (req, res) => {
  try {
    const artisans = await Artisan.findAll({
      include: [{
        model: Specialite,
        as: 'specialite',
        attributes: ['id', 'nom'],
        include: [{
          model: Category,
          as: 'category',
          attributes: ['id', 'nom']
        }]
      }],
      order: [['nom', 'ASC']]
    });

    res.json({
      success: true,
      data: artisans
    });
  } catch (error) {
    console.error('Erreur getAllArtisans:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la récupération des artisans'
    });
  }
};

// GET /api/artisans/:id - Récupérer un artisan par ID
exports.getArtisanById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const artisan = await Artisan.findByPk(id, {
      include: [{
        model: Specialite,
        as: 'specialite',
        attributes: ['id', 'nom'],
        include: [{
          model: Category,
          as: 'category',
          attributes: ['id', 'nom']
        }]
      }]
    });

    if (!artisan) {
      return res.status(404).json({
        success: false,
        message: 'Artisan non trouvé'
      });
    }

    res.json({
      success: true,
      data: artisan
    });
  } catch (error) {
    console.error('Erreur getArtisanById:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
};

// GET /api/artisans/top - Récupérer les 3 artisans du mois
exports.getTopArtisans = async (req, res) => {
  try {
    const artisans = await Artisan.findAll({
      where: { top: true },
      include: [{
        model: Specialite,
        as: 'specialite',
        attributes: ['id', 'nom']
      }],
      order: [['note', 'DESC']],
      limit: 3
    });

    res.json({
      success: true,
      data: artisans
    });
  } catch (error) {
    console.error('Erreur getTopArtisans:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
};

// GET /api/artisans/category/:categoryId - Artisans par catégorie
exports.getArtisansByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const artisans = await Artisan.findAll({
      include: [{
        model: Specialite,
        as: 'specialite',
        attributes: ['id', 'nom'],
        required: true,
        include: [{
          model: Category,
          as: 'category',
          attributes: ['id', 'nom'],
          where: { id: categoryId }
        }]
      }],
      order: [['nom', 'ASC']]
    });

    res.json({
      success: true,
      data: artisans
    });
  } catch (error) {
    console.error('Erreur getArtisansByCategory:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
};

// GET /api/artisans/search?q=... - Recherche par nom
exports.searchArtisans = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Paramètre de recherche manquant'
      });
    }

    const artisans = await Artisan.findAll({
      where: {
        nom: {
          [Op.like]: `%${q}%`
        }
      },
      include: [{
        model: Specialite,
        as: 'specialite',
        attributes: ['id', 'nom'],
        include: [{
          model: Category,
          as: 'category',
          attributes: ['id', 'nom']
        }]
      }],
      order: [['nom', 'ASC']]
    });

    res.json({
      success: true,
      data: artisans
    });
  } catch (error) {
    console.error('Erreur searchArtisans:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
};