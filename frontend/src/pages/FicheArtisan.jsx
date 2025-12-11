import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getArtisanById } from '../services/api';
import './FicheArtisan.scss';

const FicheArtisan = () => {
  const { id } = useParams();
  const [artisan, setArtisan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    objet: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const fetchArtisan = async () => {
      try {
        const response = await getArtisanById(id);
        setArtisan(response.data);
      } catch (err) {
        setError('Artisan non trouvé');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArtisan();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Envoyer email (à implémenter avec nodemailer côté backend)
    console.log('Formulaire soumis:', formData);
    setFormSubmitted(true);
    
    // Reset form après 3 secondes
    setTimeout(() => {
      setFormData({ nom: '', email: '', objet: '', message: '' });
      setFormSubmitted(false);
    }, 3000);
  };

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

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  if (error || !artisan) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">{error}</div>
        <Link to="/" className="btn btn-primary">Retour à l'accueil</Link>
      </div>
    );
  }

  return (
    <div className="fiche-artisan">
      <div className="container mt-4">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Accueil</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/artisans/category/${artisan.specialite?.category?.id}`}>
                {artisan.specialite?.category?.nom}
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {artisan.nom}
            </li>
          </ol>
        </nav>

        <div className="row">
          <div className="col-lg-8">
            {/* Informations artisan */}
            <div className="artisan-header mb-4">
              <h1>{artisan.nom}</h1>
              
              <div className="stars mb-2">
                {renderStars(parseFloat(artisan.note))}
                <span className="ms-2 text-muted">{artisan.note}/5</span>
              </div>
              
              <p className="text-muted mb-1">
                <strong>Spécialité :</strong> {artisan.specialite?.nom}
              </p>
              
              <p className="text-muted mb-3">
                <strong>Localisation :</strong> 📍 {artisan.ville}
              </p>
            </div>

            {/* À propos */}
            <div className="about-section mb-4">
              <h2>À propos</h2>
              <p>{artisan.a_propos}</p>
            </div>

            {/* Site web */}
            {artisan.site_web && (
              <div className="website-section mb-4">
                <h3>Site web</h3>
                <a 
                  href={artisan.site_web} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-outline-primary"
                >
                  🌐 Visiter le site web
                </a>
              </div>
            )}
          </div>

          <div className="col-lg-4">
            {/* Formulaire de contact */}
            <div className="contact-form-box">
              <h3>Contacter {artisan.nom}</h3>
              
              {formSubmitted ? (
                <div className="alert alert-success">
                  Message envoyé ! Vous recevrez une réponse sous 48h.
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="nom" className="form-label">Nom *</label>
                    <input
                      type="text"
                      className="form-control"
                      id="nom"
                      name="nom"
                      value={formData.nom}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email *</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="objet" className="form-label">Objet *</label>
                    <input
                      type="text"
                      className="form-control"
                      id="objet"
                      name="objet"
                      value={formData.objet}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">Message *</label>
                    <textarea
                      className="form-control"
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary w-100">
                    Envoyer le message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FicheArtisan;