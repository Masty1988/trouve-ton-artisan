const { Sequelize } = require("sequelize");
require("dotenv").config();

const database = new Sequelize(
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

// Vérification connexion base de données
const verifyDatabaseConnection = async () => {
  try {
    await database.authenticate();
    console.log("✅ Connexion MySQL réussie");
  } catch (err) {
    console.error("❌ Erreur connexion MySQL:", {
      message: err.message,
      code: err.original?.code,
      errno: err.original?.errno,
      sqlState: err.original?.sqlState,
      sqlMessage: err.original?.sqlMessage,
      sql: err.original?.sql,
    });
    throw err;
  }
};

module.exports = { sequelize: database, verifyDatabaseConnection };
