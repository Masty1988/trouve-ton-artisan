import { Link, NavLink } from 'react-router-dom';
import './Header.scss';

const Header = ({ categories }) => {
  return (
    <header className="header">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-3">
            <Link to="/" className="logo-link">
              <img 
                src="/logo-trouve-ton-artisan.svg" 
                alt="Trouve ton artisan" 
                className="logo"
              />
            </Link>
          </div>
          
          <div className="col-md-6">
            <nav className="nav justify-content-center">
              {categories.map((category) => (
                <NavLink
                  key={category.id}
                  to={`/artisans/category/${category.id}`}
                  className="nav-link"
                >
                  {category.nom}
                </NavLink>
              ))}
            </nav>
          </div>
          
          <div className="col-md-3">
            <div className="search-box">
              <input
                type="text"
                className="form-control"
                placeholder="Rechercher..."
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;