const CategoryModel = require('./Category');
const SpecialiteModel = require('./Specialite');
const ArtisanModel = require('./Artisan');

// Relations entre les modèles
CategoryModel.hasMany(SpecialiteModel, {
  foreignKey: 'categorie_id',
  as: 'specialites'
});

SpecialiteModel.belongsTo(CategoryModel, {
  foreignKey: 'categorie_id',
  as: 'category'
});

SpecialiteModel.hasMany(ArtisanModel, {
  foreignKey: 'specialite_id',
  as: 'artisans'
});

ArtisanModel.belongsTo(SpecialiteModel, {
  foreignKey: 'specialite_id',
  as: 'specialite'
});

module.exports = {
  Category: CategoryModel,
  Specialite: SpecialiteModel,
  Artisan: ArtisanModel
};