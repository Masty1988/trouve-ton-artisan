const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Specialite = sequelize.define('Specialite', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  categorie_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'categorie_id'
  }
}, {
  tableName: 'specialites',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Specialite;