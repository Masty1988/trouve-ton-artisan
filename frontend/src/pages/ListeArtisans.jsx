import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getArtisansByCategory, getCategoryById } from '../services/api';
import ArtisanCard from '../components/ArtisanCard';
import './ListeArtisans.scss';

const ListeArtisans = () => {
  const { categoryId } = useParams();
  const [artisans, setArtisans] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [artisansResponse, categoryResponse] = await Promise.all([
          getArtisansByCategory(categoryId),
          getCategoryById(categoryId)
        ]);
        
        setArtisans(artisansResponse.data);
        setCategory(categoryResponse.data);
      } catch (err) {
        setError('Erreur lors du chargement des artisans');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId]);

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
    <div className="liste-artisans">
      <div className="container mt-4">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Accueil</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {category?.nom}
            </li>
          </ol>
        </nav>

        <h1 className="mb-4">Nos artisans - {category?.nom}</h1>

        {artisans.length === 0 ? (
          <div className="alert alert-info">
            Aucun artisan trouvé dans cette catégorie.
          </div>
        ) : (
          <div className="row g-4">
            {artisans.map((artisan) => (
              <div key={artisan.id} className="col-md-4">
                <ArtisanCard artisan={artisan} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListeArtisans;