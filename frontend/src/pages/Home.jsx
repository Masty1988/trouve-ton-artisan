import { useState, useEffect } from 'react';
import ArtisanCard from '../components/ArtisanCard';
import './Home.scss';

// Données mockées pour les screenshots
const MOCK_TOP_ARTISANS = [
  {
    id: 5,
    nom: "Orville Samons",
    note: "5.0",
    ville: "Évian",
    specialite: { id: 5, nom: "Chauffagiste" }
  },
  {
    id: 4,
    nom: "Chocolaterie Labbé",
    note: "4.9",
    ville: "Lyon",
    specialite: { id: 4, nom: "Chocolatier" }
  },
  {
    id: 3,
    nom: "Au Pain Chaud",
    note: "4.8",
    ville: "Montélimar",
    specialite: { id: 3, nom: "Boulanger" }
  }
];

const Home = () => {
  const [topArtisans, setTopArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simule un chargement
    setTimeout(() => {
      setTopArtisans(MOCK_TOP_ARTISANS);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <main className="home">
      <div className="container">
        {/* Section Comment trouver */}
        <section className="how-to-find">
          <h2>Comment trouver mon artisan ?</h2>
          <div className="steps">
            <div className="step">
              <span className="step-number">1</span>
              <p>Choisissez la catégorie d'artisanat dans le menu</p>
            </div>
            <div className="step">
              <span className="step-number">2</span>
              <p>Choisir un artisan</p>
            </div>
            <div className="step">
              <span className="step-number">3</span>
              <p>Le contacter via le formulaire de contact</p>
            </div>
            <div className="step">
              <span className="step-number">4</span>
              <p>Une réponse sera apportée sous 48h</p>
            </div>
          </div>
        </section>

        {/* Section Top 3 */}
        <section className="top-artisans">
          <h2>Top 3 du mois</h2>
          <div className="artisans-grid">
            {topArtisans.map((artisan) => (
              <ArtisanCard key={artisan.id} artisan={artisan} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home;