const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { verifyDatabaseConnection } = require("./config/database");
const apiRoutes = require("./routes");
const { rateLimiter, securityHeaders } = require("./middleware/security");

const app = express();
const serverPort = process.env.PORT || 3000;

// ============================================
// SÉCURITÉ
// ============================================

// Helmet - Sécurise les headers HTTP
app.use(securityHeaders);

// Rate limiting global
app.use("/api/", rateLimiter);

// ============================================
// MIDDLEWARE
// ============================================

// CORS - Autoriser les requêtes depuis le frontend
app.use(cors())
  

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
app.use("/api", apiRoutes);

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

const launchServer = async () => {
  try {
    // Test connexion BDD
    await verifyDatabaseConnection();

    // Démarrage serveur
    app.listen(serverPort, () => {
      console.log(`🚀 Serveur démarré sur http://localhost:${serverPort}`);
      console.log(`📝 Documentation API: http://localhost:${serverPort}`);
      console.log(`🔒 Sécurité: Helmet + Rate Limiting activés`);
    });
  } catch (error) {
    console.error("❌ Erreur démarrage serveur:", error);
    process.exit(1);
  }
};

launchServer();
