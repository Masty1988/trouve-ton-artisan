import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getCategories } from './services/api';
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
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data);
      } catch (error) {
        console.error('Erreur chargement catégories:', error);
      }
    };

    fetchCategories();
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
            
            {/* Pages légales */}
            <Route path="/mentions-legales" element={<EnConstruction />} />
            <Route path="/donnees-personnelles" element={<EnConstruction />} />
            <Route path="/accessibilite" element={<EnConstruction />} />
            <Route path="/cookies" element={<EnConstruction />} />
            
            {/* Page 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;