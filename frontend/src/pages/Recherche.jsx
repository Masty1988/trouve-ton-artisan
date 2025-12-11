import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { searchArtisans } from '../services/api';
import ArtisanCard from '../components/ArtisanCard';
import './Recherche.scss';

const Recherche = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query || query.trim().length < 2) {
        setError('Veuillez entrer au moins 2 caractères');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await searchArtisans(query);
        setArtisans(response.data);
      } catch (err) {
        setError('Erreur lors de la recherche');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="recherche">
      <div className="container mt-4">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Accueil</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Recherche
            </li>
          </ol>
        </nav>

        <h1 className="mb-4">
          Résultats de recherche pour "{query}"
        </h1>

        {error ? (
          <div className="alert alert-danger">{error}</div>
        ) : artisans.length === 0 ? (
          <div className="alert alert-info">
            Aucun artisan trouvé pour cette recherche.
            <br />
            <Link to="/" className="alert-link mt-2 d-inline-block">
              Retour à l'accueil
            </Link>
          </div>
        ) : (
          <>
            <p className="text-muted mb-4">
              {artisans.length} artisan{artisans.length > 1 ? 's' : ''} trouvé{artisans.length > 1 ? 's' : ''}
            </p>
            
            <div className="row g-4">
              {artisans.map((artisan) => (
                <div key={artisan.id} className="col-md-4">
                  <ArtisanCard artisan={artisan} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Recherche;