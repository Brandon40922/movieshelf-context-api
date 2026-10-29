
import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Watchlist from './pages/Watchlist';
import MovieDetails from './pages/MovieDetails';
import { searchMovies } from './services/movieService';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);

  const [favorites, setFavorites] = useState(() => {
    try {
      const savedFavorites = localStorage.getItem('favorites');
      const parsed = savedFavorites
        ? JSON.parse(savedFavorites)
        : [];

      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error('Error loading favorites:', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  }, [favorites]);

  const toggleFavorite = (movie) => {
    setFavorites((currentFavorites) => {
      const alreadyFavorite = currentFavorites.some(
        (favorite) => favorite.id === movie.id
      );

      if (alreadyFavorite) {
        return currentFavorites.filter(
          (favorite) => favorite.id !== movie.id
        );
      }

      return [...currentFavorites, movie];
    });
  };

  useEffect(() => {
    if (!searchQuery) {
      setSearchResults([]);
      setSearchLoading(false);
      setSearchError(null);
      return;
    }

    let cancelled = false;

    async function performSearch() {
      try {
        setSearchLoading(true);
        setSearchError(null);
        setSearchResults([]);

        const results = await searchMovies(searchQuery);

        if (!cancelled) {
          setSearchResults(results);
        }
      } catch (error) {
        if (!cancelled) {
          setSearchError('Failed to search movies.');
        }
      } finally {
        if (!cancelled) {
          setSearchLoading(false);
        }
      }
    }

    const timeoutId = setTimeout(performSearch, 300);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [searchQuery]);

  return (
    <Router>
      <div className="app">
        <Header onSearch={setSearchQuery} />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                searchQuery={searchQuery}
                searchResults={searchResults}
                searchLoading={searchLoading}
                searchError={searchError}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
              />
            }
          />

          <Route
            path="/favorites"
            element={
              <Favorites
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
              />
            }
          />

          <Route
            path="/watchlist"
            element={<Watchlist />}
          />

          <Route
            path="/movie/:id"
            element={<MovieDetails />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;



