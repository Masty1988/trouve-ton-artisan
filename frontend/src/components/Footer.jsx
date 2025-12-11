import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>La Région</h5>
            <p>Auvergne-Rhône-Alpes</p>
            <p className="small">Conseil régional<br/>Auvergne-Rhône-Alpes</p>
          </div>
          
          <div className="col-md-4">
            <h5>Lyon</h5>
            <p className="small">
              101 cours Charlemagne<br/>
              CS 20033<br/>
              69269 LYON CEDEX 02<br/>
              France
            </p>
            <p className="small">
              📞 +33 (0)4 26 73 40 00
            </p>
          </div>
          
          <div className="col-md-4">
            <h5>Liens légaux</h5>
            <ul className="list-unstyled">
              <li><Link to="/mentions-legales">Mentions légales</Link></li>
              <li><Link to="/donnees-personnelles">Données personnelles</Link></li>
              <li><Link to="/accessibilite">Accessibilité</Link></li>
              <li><Link to="/cookies">Cookies</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="row mt-4">
          <div className="col text-center">
            <div className="social-icons">
              {/* Ajouter les icônes RS ici */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;