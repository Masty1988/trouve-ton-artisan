const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Artisan = sequelize.define('Artisan', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  site_web: {
    type: DataTypes.STRING(255),
    allowNull: true,
    field: 'site_web'
  },
  note: {
    type: DataTypes.DECIMAL(2, 1),
    allowNull: true,
    validate: {
      min: 0,
      max: 5
    }
  },
  ville: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  a_propos: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'a_propos'
  },
  top: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  specialite_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'specialite_id'
  }
}, {
  tableName: 'artisans',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Artisan;