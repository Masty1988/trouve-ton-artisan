import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getCategories } from './services/api';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
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
            <Route path="/" element={<Home />} />
            {/* Autres routes à venir */}
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;