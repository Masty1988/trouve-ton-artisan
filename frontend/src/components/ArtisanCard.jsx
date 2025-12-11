import { Link } from 'react-router-dom';
import './ArtisanCard.scss';

const ArtisanCard = ({ artisan }) => {
  // Générer les étoiles
  const renderStars = (note) => {
    const stars = [];
    const fullStars = Math.floor(note);
    const hasHalfStar = note % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star">⭐</span>);
    }
    
    if (hasHalfStar && stars.length < 5) {
      stars.push(<span key="half" className="star">⭐</span>);
    }
    
    while (stars.length < 5) {
      stars.push(<span key={`empty-${stars.length}`} className="star">☆</span>);
    }
    
    return stars;
  };

  return (
    <Link to={`/artisan/${artisan.id}`} className="text-decoration-none">
      <div className="artisan-card">
        <h3 className="artisan-name">{artisan.nom}</h3>
        
        <div className="stars mb-2">
          {renderStars(parseFloat(artisan.note))}
          <span className="ms-2 text-muted">{artisan.note}</span>
        </div>
        
        <p className="artisan-specialite">
          {artisan.specialite?.nom || 'Non spécifié'}
        </p>
        
        <p className="artisan-location">
          📍 {artisan.ville}
        </p>
      </div>
    </Link>
  );
};

export default ArtisanCard;