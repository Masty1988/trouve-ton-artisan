import { Link } from 'react-router-dom';
import './NotFound.scss';

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="container text-center">
        <div className="error-content">
          <div className="error-illustration mb-4">
            <span className="emoji">🔨</span>
            <span className="emoji">❓</span>
          </div>
          
          <h1 className="error-code">404</h1>
          <h2 className="error-title">Page introuvable</h2>
          
          <p className="error-message">
            L'artisan que vous cherchez n'existe pas ou a déménagé.
          </p>
          
          <Link to="/" className="btn btn-primary btn-lg mt-4">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;