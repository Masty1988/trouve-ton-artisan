import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchArtisanDetails } from '../services/api';
import './FicheArtisan.scss';

const FicheArtisan = () => {
  const { id } = useParams();
  const [craftsmanData, setCraftsmanData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [contactForm, setContactForm] = useState({
    nom: '',
    email: '',
    objet: '',
    message: ''
  });
  const [wasSubmitted, setWasSubmitted] = useState(false);

  useEffect(() => {
    const loadArtisan = async () => {
      try {
        const result = await fetchArtisanDetails(id);
        setCraftsmanData(result.data);
      } catch (err) {
        setErrorMsg('Artisan non trouvé');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadArtisan();
  }, [id]);

  const updateFormField = (e) => {
    const { name, value } = e.target;
    setContactForm(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const processFormSubmit = (e) => {
    e.preventDefault();
    // TODO: Envoyer email (à implémenter avec nodemailer côté backend)
    console.log('Formulaire soumis:', contactForm);
    setWasSubmitted(true);

    // Reset form après 3 secondes
    setTimeout(() => {
      setContactForm({ nom: '', email: '', objet: '', message: '' });
      setWasSubmitted(false);
    }, 3000);
  };

  const displayStars = (rating) => {
    const starElements = [];
    const completeStars = Math.floor(rating);
    const showHalfStar = rating % 1 !== 0;

    for (let i = 0; i < completeStars; i++) {
      starElements.push(<span key={i} className="star">⭐</span>);
    }

    if (showHalfStar && starElements.length < 5) {
      starElements.push(<span key="half" className="star">⭐</span>);
    }

    while (starElements.length < 5) {
      starElements.push(<span key={`empty-${starElements.length}`} className="star">☆</span>);
    }

    return starElements;
  };

  if (isLoading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  if (errorMsg || !craftsmanData) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">{errorMsg}</div>
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
              <Link to={`/artisans/category/${craftsmanData.specialite?.category?.id}`}>
                {craftsmanData.specialite?.category?.nom}
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {craftsmanData.nom}
            </li>
          </ol>
        </nav>

        <div className="row">
          <div className="col-lg-8">
            {/* Informations artisan */}
            <div className="artisan-header mb-4">
              <h1>{craftsmanData.nom}</h1>

              <div className="stars mb-2">
                {displayStars(parseFloat(craftsmanData.note))}
                <span className="ms-2 text-muted">{craftsmanData.note}/5</span>
              </div>

              <p className="text-muted mb-1">
                <strong>Spécialité :</strong> {craftsmanData.specialite?.nom}
              </p>

              <p className="text-muted mb-3">
                <strong>Localisation :</strong> 📍 {craftsmanData.ville}
              </p>
            </div>

            {/* À propos */}
            <div className="about-section mb-4">
              <h2>À propos</h2>
              <p>{craftsmanData.a_propos}</p>
            </div>

            {/* Site web */}
            {craftsmanData.site_web && (
              <div className="website-section mb-4">
                <h3>Site web</h3>
                <a
                  href={craftsmanData.site_web}
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
              <h3>Contacter {craftsmanData.nom}</h3>

              {wasSubmitted ? (
                <div className="alert alert-success">
                  Message envoyé ! Vous recevrez une réponse sous 48h.
                </div>
              ) : (
                <form onSubmit={processFormSubmit}>
                  <div className="mb-3">
                    <label htmlFor="nom" className="form-label">Nom *</label>
                    <input
                      type="text"
                      className="form-control"
                      id="nom"
                      name="nom"
                      value={contactForm.nom}
                      onChange={updateFormField}
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
                      value={contactForm.email}
                      onChange={updateFormField}
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
                      value={contactForm.objet}
                      onChange={updateFormField}
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
                      value={contactForm.message}
                      onChange={updateFormField}
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