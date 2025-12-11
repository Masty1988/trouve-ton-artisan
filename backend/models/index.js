const Category = require('./Category');
const Specialite = require('./Specialite');
const Artisan = require('./Artisan');

// Associations
Category.hasMany(Specialite, { 
  foreignKey: 'categorie_id',
  as: 'specialites'
});

Specialite.belongsTo(Category, { 
  foreignKey: 'categorie_id',
  as: 'category'
});

Specialite.hasMany(Artisan, { 
  foreignKey: 'specialite_id',
  as: 'artisans'
});

Artisan.belongsTo(Specialite, { 
  foreignKey: 'specialite_id',
  as: 'specialite'
});

module.exports = {
  Category,
  Specialite,
  Artisan
};