const { Artisan, Specialite, Category } = require('../models');
const { Op } = require('sequelize');

// GET /api/artisans - Récupérer tous les artisans
exports.fetchAllArtisans = async (req, res) => {
  try {
    const craftsmen = await Artisan.findAll({
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
      data: craftsmen
    });
  } catch (err) {
    console.error('Erreur fetchAllArtisans:', err);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la récupération des artisans'
    });
  }
};

// GET /api/artisans/:id - Récupérer un artisan par ID
exports.findArtisanById = async (req, res) => {
  try {
    const { id } = req.params;

    const craftsman = await Artisan.findByPk(id, {
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

    if (!craftsman) {
      return res.status(404).json({
        success: false,
        message: 'Artisan non trouvé'
      });
    }

    res.json({
      success: true,
      data: craftsman
    });
  } catch (err) {
    console.error('Erreur findArtisanById:', err);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
};

// GET /api/artisans/top - Récupérer les 3 artisans du mois
exports.fetchTopRatedArtisans = async (req, res) => {
  try {
    const topCraftsmen = await Artisan.findAll({
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
      data: topCraftsmen
    });
  } catch (err) {
    console.error('Erreur fetchTopRatedArtisans:', err);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
};

// GET /api/artisans/category/:categoryId - Artisans par catégorie
exports.listArtisansByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const craftsmenList = await Artisan.findAll({
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
      data: craftsmenList
    });
  } catch (err) {
    console.error('Erreur listArtisansByCategory:', err);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
};

// GET /api/artisans/search?q=... - Recherche par nom
exports.searchArtisansByName = async (req, res) => {
  try {
    const { q: searchTerm } = req.query;

    if (!searchTerm || searchTerm.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Paramètre de recherche manquant'
      });
    }

    const results = await Artisan.findAll({
      where: {
        nom: {
          [Op.like]: `%${searchTerm}%`
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
      data: results
    });
  } catch (err) {
    console.error('Erreur searchArtisansByName:', err);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
};