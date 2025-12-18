import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { searchArtisansByKeyword } from '../services/api';
import './Header.scss';

const Header = ({ categories }) => {
  const [userInput, setUserInput] = useState('');
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [autocompleteResults, setAutocompleteResults] = useState([]);
  const [shouldShowResults, setShouldShowResults] = useState(false);
  const navigate = useNavigate();

  // Recherche des suggestions pendant la frappe
  useEffect(() => {
    const loadSuggestions = async () => {
      if (userInput.trim().length >= 2) {
        try {
          const result = await searchArtisansByKeyword(userInput);
          setAutocompleteResults(result.data.slice(0, 5)); // Max 5 suggestions
          setShouldShowResults(true);
        } catch (err) {
          console.error('Erreur recherche:', err);
          setAutocompleteResults([]);
        }
      } else {
        setAutocompleteResults([]);
        setShouldShowResults(false);
      }
    };

    // Debounce : attend 300ms après la dernière frappe
    const debounceTimer = setTimeout(loadSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [userInput]);

  const submitSearch = (e) => {
    e.preventDefault();
    if (userInput.trim().length >= 2) {
      navigate(`/recherche?q=${encodeURIComponent(userInput.trim())}`);
      setIsSearchVisible(false);
      setShouldShowResults(false);
    }
  };

  const selectSuggestion = (craftsman) => {
    navigate(`/artisan/${craftsman.id}`);
    setUserInput('');
    setShouldShowResults(false);
    setIsSearchVisible(false);
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
              onClick={() => setIsSearchVisible(!isSearchVisible)}
              aria-label="Recherche"
            >
              🔍
            </button>
            <button
              className="burger-btn"
              onClick={() => setIsMenuVisible(!isMenuVisible)}
              aria-label="Menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>

          {/* Recherche desktop */}
          <div className="col-md-4 offset-md-4 d-none d-md-block">
            <form onSubmit={submitSearch} className="search-box">
              <input
                type="text"
                className="form-control"
                placeholder="Rechercher..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onFocus={() => autocompleteResults.length > 0 && setShouldShowResults(true)}
                onBlur={() => setTimeout(() => setShouldShowResults(false), 200)}
                minLength={2}
              />
              <button type="submit" className="search-btn">🔍</button>

              {/* Liste des suggestions */}
              {shouldShowResults && autocompleteResults.length > 0 && (
                <ul className="suggestions-list">
                  {autocompleteResults.map((craftsman) => (
                    <li
                      key={craftsman.id}
                      onClick={() => selectSuggestion(craftsman)}
                    >
                      <strong>{craftsman.nom}</strong>
                      <span className="suggestion-meta">
                        {craftsman.specialite?.nom} - {craftsman.ville}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </form>
          </div>
        </div>

        {/* Barre de recherche mobile (toggle) */}
        {isSearchVisible && (
          <div className="row mt-2 d-md-none">
            <div className="col-12">
              <form onSubmit={submitSearch} className="search-box">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Rechercher..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onFocus={() => autocompleteResults.length > 0 && setShouldShowResults(true)}
                  onBlur={() => setTimeout(() => setShouldShowResults(false), 200)}
                  minLength={2}
                  autoFocus
                />
                <button type="submit" className="search-btn">🔍</button>

                {/* Liste des suggestions mobile */}
                {shouldShowResults && autocompleteResults.length > 0 && (
                  <ul className="suggestions-list">
                    {autocompleteResults.map((craftsman) => (
                      <li
                        key={craftsman.id}
                        onClick={() => selectSuggestion(craftsman)}
                      >
                        <strong>{craftsman.nom}</strong>
                        <span className="suggestion-meta">
                          {craftsman.specialite?.nom} - {craftsman.ville}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </form>
            </div>
          </div>
        )}

        {/* Deuxième ligne : Navigation avec chevrons */}
        <div className="row">
          <div className={`col-12 nav-wrapper ${isMenuVisible ? 'show' : ''}`}>
            <nav className="nav justify-content-center">
              {categories.map((category) => (
                <div key={category.id} className="nav-item">
                  <NavLink
                    to={`/artisans/category/${category.id}`}
                    className="nav-link"
                    onClick={() => setIsMenuVisible(false)}
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