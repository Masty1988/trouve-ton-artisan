const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { testConnection } = require("./config/database");
const routes = require("./routes");
const { limiter, helmetConfig } = require("./middleware/security");

const app = express();
const PORT = process.env.PORT || 3000;

// ============================================
// SÉCURITÉ
// ============================================

// Helmet - Sécurise les headers HTTP
app.use(helmetConfig);

// Rate limiting global
app.use("/api/", limiter);

// ============================================
// MIDDLEWARE
// ============================================

// CORS - Autoriser les requêtes depuis le frontend
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Parser JSON
app.use(express.json());
app.use(express.json({ charset: "utf-8" }));
app.use(express.urlencoded({ extended: true, charset: "utf-8" }));
app.use(express.urlencoded({ extended: true }));

// Logs des requêtes (dev)
if (process.env.NODE_ENV === "development") {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });
}

// ============================================
// ROUTES
// ============================================

// Route de test
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API Trouve ton artisan",
    version: "1.0.0",
    endpoints: {
      categories: "/api/categories",
      artisans: "/api/artisans",
      topArtisans: "/api/artisans/top",
      searchArtisans: "/api/artisans/search?q=...",
      artisansByCategory: "/api/artisans/category/:categoryId",
    },
  });
});

// Routes API
app.use("/api", routes);

// Route 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route non trouvée",
  });
});

// ============================================
// GESTION ERREURS
// ============================================

app.use((err, req, res, next) => {
  console.error("Erreur serveur:", err);
  res.status(500).json({
    success: false,
    message: "Erreur interne du serveur",
  });
});

// ============================================
// DÉMARRAGE SERVEUR
// ============================================

const startServer = async () => {
  try {
    // Test connexion BDD
    await testConnection();

    // Démarrage serveur
    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
      console.log(`📝 Documentation API: http://localhost:${PORT}`);
      console.log(`🔒 Sécurité: Helmet + Rate Limiting activés`);
    });
  } catch (error) {
    console.error("❌ Erreur démarrage serveur:", error);
    process.exit(1);
  }
};

startServer();
