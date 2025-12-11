const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    charset: "utf8mb4",
    collation: "utf8mb4_unicode_ci",
    dialect: "mysql",
    logging: process.env.NODE_ENV === "development" ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      timestamps: true,
      underscored: true,
      charset: "utf8mb4",
      collate: "utf8mb4_unicode_ci",
    },
  }
);

// Test de connexion
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connexion MySQL réussie");
  } catch (error) {
    console.error("❌ Erreur connexion MySQL:", {
      message: error.message,
      code: error.original?.code,
      errno: error.original?.errno,
      sqlState: error.original?.sqlState,
      sqlMessage: error.original?.sqlMessage,
      sql: error.original?.sql,
    });
    throw error;
  }
};

module.exports = { sequelize, testConnection };
