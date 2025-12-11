import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Header.scss';

const Header = ({ categories }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim().length >= 2) {
      navigate(`/recherche?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-3">
            <Link to="/" className="logo-link">
              <h1 className="logo-text">
                Trouve ton artisan !
                <small>Avec la région<br/>Auvergne-Rhône-Alpes</small>
              </h1>
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
            <form onSubmit={handleSearch} className="search-box">
              <input
                type="text"
                className="form-control"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                minLength={2}
              />
            </form>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;