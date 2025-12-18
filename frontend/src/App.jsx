import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchCategories } from './services/api';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ListeArtisans from './pages/ListeArtisans';
import FicheArtisan from './pages/FicheArtisan';
import Recherche from './pages/Recherche';
import NotFound from './pages/NotFound';
import EnConstruction from './pages/EnConstruction';
import './styles/main.scss';

function App() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const result = await fetchCategories();
        setCategories(result.data);
      } catch (err) {
        console.error('Erreur chargement catégories:', err);
      }
    };

    loadCategories();
  }, []);

  return (
    <Router>
      <div className="App">
        <Header categories={categories} />
        
        <main className="main-content">
          <Routes>
            {/* Page d'accueil */}
            <Route path="/" element={<Home />} />
            
            {/* Recherche */}
            <Route path="/recherche" element={<Recherche />} />
            
            {/* Liste artisans par catégorie */}
            <Route path="/artisans/category/:categoryId" element={<ListeArtisans />} />
            
            {/* Fiche artisan */}
            <Route path="/artisan/:id" element={<FicheArtisan />} />
            
            {/* Pages légales - En construction */}
            <Route path="/mentions-legales" element={<EnConstruction title="Mentions légales" />} />
            <Route path="/donnees-personnelles" element={<EnConstruction title="Données personnelles" />} />
            <Route path="/accessibilite" element={<EnConstruction title="Accessibilité" />} />
            <Route path="/cookies" element={<EnConstruction title="Cookies" />} />
            
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;