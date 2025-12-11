import { useState, useEffect } from 'react';
import { getTopArtisans } from '../services/api';
import ArtisanCard from '../components/ArtisanCard';
import './Home.scss';

const Home = () => {
  const [topArtisans, setTopArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopArtisans = async () => {
      try {
        const response = await getTopArtisans();
        setTopArtisans(response.data);
      } catch (err) {
        setError('Erreur lors du chargement des artisans');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopArtisans();
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
    <div className="home">
      <div className="container">
        {/* Section Comment trouver */}
        <section className="how-to-find mt-5">
          <h2 className="text-center mb-4">Comment trouver mon artisan ?</h2>
          
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <p>Choisissez la catégorie d'artisanat dans le menu</p>
            </div>
            
            <div className="step">
              <div className="step-number">2</div>
              <p>Choisir un artisan</p>
            </div>
            
            <div className="step">
              <div className="step-number">3</div>
              <p>Le contacter via le formulaire de contact</p>
            </div>
            
            <div className="step">
              <div className="step-number">4</div>
              <p>Une réponse sera apportée sous 48h</p>
            </div>
          </div>
        </section>

        {/* Section Top 3 */}
        <section className="top-artisans mt-5">
          <h2 className="text-center mb-4">Top 3 du mois</h2>
          
          <div className="row g-4">
            {topArtisans.map((artisan) => (
              <div key={artisan.id} className="col-md-4">
                <ArtisanCard artisan={artisan} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;