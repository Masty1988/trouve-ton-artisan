import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Header.scss';

const Header = ({ categories }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim().length >= 2) {
      navigate(`/recherche?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  return (
    <header className="header">
      <div className="container">
        {/* Première ligne : Logo + Loupe mobile */}
        <div className="row align-items-center header-top">
          <div className="col-8 col-md-4">
            <Link to="/" className="logo-link">
            <img 
  src="/Logo.png" 
  alt="Trouve ton artisan - Auvergne-Rhône-Alpes" 
  className="logo-img"
/>
            </Link>
          </div>
          
          {/* Loupe mobile + Burger */}
          <div className="col-4 d-md-none text-end">
            <button 
              className="search-toggle-btn me-2"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Recherche"
            >
              🔍
            </button>
            <button 
              className="burger-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
          
          {/* Recherche desktop */}
          <div className="col-md-4 offset-md-4 d-none d-md-block">
            <form onSubmit={handleSearch} className="search-box">
              <input
                type="text"
                className="form-control"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                minLength={2}
              />
              <button type="submit" className="search-btn">🔍</button>
            </form>
          </div>
        </div>
        
        {/* Barre de recherche mobile (toggle) */}
        {searchOpen && (
          <div className="row mt-2 d-md-none">
            <div className="col-12">
              <form onSubmit={handleSearch} className="search-box">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  minLength={2}
                  autoFocus
                />
                <button type="submit" className="search-btn">🔍</button>
              </form>
            </div>
          </div>
        )}
        
        {/* Deuxième ligne : Navigation avec chevrons */}
        <div className="row">
          <div className={`col-12 nav-wrapper ${menuOpen ? 'show' : ''}`}>
            <nav className="nav justify-content-center">
              {categories.map((category) => (
                <div key={category.id} className="nav-item">
                  <NavLink
                    to={`/artisans/category/${category.id}`}
                    className="nav-link"
                    onClick={() => setMenuOpen(false)}
                  >
                    {category.nom}
                    <span className="chevron">▼</span>
                  </NavLink>
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};


export default Header;