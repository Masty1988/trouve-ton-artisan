import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArtisansByCategory, fetchCategoryDetails } from '../services/api';
import ArtisanCard from '../components/ArtisanCard';
import './ListeArtisans.scss';

const ListeArtisans = () => {
  const { categoryId } = useParams();
  const [craftsmenList, setCraftsmenList] = useState([]);
  const [categoryInfo, setCategoryInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const loadPageData = async () => {
      try {
        setIsLoading(true);
        const [craftsmenResult, categoryResult] = await Promise.all([
          fetchArtisansByCategory(categoryId),
          fetchCategoryDetails(categoryId)
        ]);

        setCraftsmenList(craftsmenResult.data);
        setCategoryInfo(categoryResult.data);
      } catch (err) {
        setErrorMsg('Erreur lors du chargement des artisans');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadPageData();
  }, [categoryId]);

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
    <div className="liste-artisans">
      <div className="container mt-4">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Accueil</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {categoryInfo?.nom}
            </li>
          </ol>
        </nav>

        <h1 className="mb-4">Nos artisans - {categoryInfo?.nom}</h1>

        {craftsmenList.length === 0 ? (
          <div className="alert alert-info">
            Aucun artisan trouvé dans cette catégorie.
          </div>
        ) : (
          <div className="row g-4">
            {craftsmenList.map((craftsman) => (
              <div key={craftsman.id} className="col-md-4">
                <ArtisanCard artisan={craftsman} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListeArtisans;