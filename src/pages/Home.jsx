
import { useState, useEffect } from 'react';
import MovieGrid from '../components/MovieGrid';
import { getPopularMovies } from '../services/movieService'; 
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

function Home({
  searchQuery,
  searchResults,
  searchLoading,
  searchError,
  favorites,
  onToggleFavorite
}) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadMovies() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getPopularMovies();

        if (!cancelled) {
          setMovies(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError('Failed to load movies.');
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadMovies();

    return () => {
      cancelled = true;
    };
  }, []);

  const isSearching = Boolean(searchQuery);
  const displayedMovies = isSearching ? searchResults : movies;
  const loading = isSearching ? searchLoading : isLoading;
  const currentError = isSearching ? searchError : error;

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>
          {isSearching
            ? `Search Results for "${searchQuery}"`
            : 'Popular Movies'}
        </h2>

        <p>Discover and save your favorite films</p>
      </div>

      {loading ? (
  <LoadingSpinner />
) : currentError ? (
  <ErrorMessage message={currentError} />
) : displayedMovies.length === 0 ? (
        <p>No movies found.</p>
      ) : (
        <MovieGrid
          movies={displayedMovies}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
        />
      )}
    </main>
  );
}

export default Home;
