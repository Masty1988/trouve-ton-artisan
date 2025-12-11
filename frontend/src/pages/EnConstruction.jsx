import { Link } from 'react-router-dom';
import './EnConstruction.scss';

const EnConstruction = () => {
  return (
    <div className="en-construction">
      <div className="container text-center">
        <div className="construction-content">
          <div className="construction-image mb-4">
            <span className="emoji">🚧</span>
          </div>
          
          <h1>Page en construction</h1>
          
          <p className="lead">
            Cette page sera bientôt disponible.
          </p>
          
          <Link to="/" className="btn btn-primary mt-4">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EnConstruction;