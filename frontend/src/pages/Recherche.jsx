import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { searchArtisansByKeyword } from '../services/api';
import ArtisanCard from '../components/ArtisanCard';
import './Recherche.scss';

const Recherche = () => {
  const [searchParams] = useSearchParams();
  const searchKeyword = searchParams.get('q');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const loadSearchResults = async () => {
      if (!searchKeyword || searchKeyword.trim().length < 2) {
        setErrorMsg('Veuillez entrer au moins 2 caractères');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const result = await searchArtisansByKeyword(searchKeyword);
        setSearchResults(result.data);
      } catch (err) {
        setErrorMsg('Erreur lors de la recherche');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadSearchResults();
  }, [searchKeyword]);

  if (isLoading) {
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
          Résultats de recherche pour "{searchKeyword}"
        </h1>

        {errorMsg ? (
          <div className="alert alert-danger">{errorMsg}</div>
        ) : searchResults.length === 0 ? (
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
              {searchResults.length} artisan{searchResults.length > 1 ? 's' : ''} trouvé{searchResults.length > 1 ? 's' : ''}
            </p>

            <div className="row g-4">
              {searchResults.map((craftsman) => (
                <div key={craftsman.id} className="col-md-4">
                  <ArtisanCard artisan={craftsman} />
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