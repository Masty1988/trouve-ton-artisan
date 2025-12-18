import { useState, useEffect } from 'react';
import { fetchTopArtisans } from '../services/api';
import ArtisanCard from '../components/ArtisanCard';
import './Home.scss';

const Home = () => {
  const [featuredArtisans, setFeaturedArtisans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const loadTopArtisans = async () => {
      try {
        const result = await fetchTopArtisans();
        setFeaturedArtisans(result.data);
      } catch (err) {
        setErrorMsg('Erreur lors du chargement des artisans');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadTopArtisans();
  }, []);

  if (isLoading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">{errorMsg}</div>
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
            {featuredArtisans.map((craftsman) => (
              <ArtisanCard key={craftsman.id} artisan={craftsman} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home;