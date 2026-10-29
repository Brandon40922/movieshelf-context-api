
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMovies } from '../contexts/MovieContext';
import { getMovieDetails } from '../services/movieService';

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist
  } = useMovies();

  useEffect(() => {
    let cancelled = false;

    async function loadMovie() {
      setLoading(true);
      setError(null);
      setMovie(null);

      try {
        const data = await getMovieDetails(id);

        if (!cancelled) {
          setMovie(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError('Failed to load movie details.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadMovie();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return <main className="main-content">Loading movie details...</main>;
  }

  if (error) {
    return <main className="main-content">{error}</main>;
  }

  if (!movie) {
    return <main className="main-content">Movie not found.</main>;
  }

  const saved = isInWatchlist(movie.id);

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://placehold.co/300x450?text=No+Poster';

  return (
    <main className="main-content">
      <Link to="/" className="back-link">
        ← Back to Movies
      </Link>

      <div className="movie-details-page">
        <img
          className="details-poster"
          src={posterUrl}
          alt={movie.title}
        />

        <div className="details-info">
          <h1>{movie.title}</h1>

          <p>{movie.overview || 'No description available.'}</p>

          <p>
            <strong>Rating:</strong>{' '}
            {movie.vote_average?.toFixed(1) ?? 'N/A'}/10
          </p>

          <p>
            <strong>Release Date:</strong>{' '}
            {movie.release_date || 'Unknown'}
          </p>

          <p>
            <strong>Runtime:</strong>{' '}
            {movie.runtime ? `${movie.runtime} minutes` : 'Unknown'}
          </p>

          <p>
            <strong>Genres:</strong>{' '}
            {movie.genres?.map((genre) => genre.name).join(', ') || 'N/A'}
          </p>

          <button
            className="watchlist-button"
            onClick={() => {
              if (saved) {
                removeFromWatchlist(movie.id);
              } else {
                addToWatchlist(movie);
              }
            }}
          >
            {saved
              ? '✓ Remove from Watchlist'
              : '+ Add to Watchlist'}
          </button>
        </div>
      </div>
    </main>
  );
}

export default MovieDetails;
