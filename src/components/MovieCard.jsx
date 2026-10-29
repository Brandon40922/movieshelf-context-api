
import { Link } from 'react-router-dom';
import { useMovies } from '../contexts/MovieContext';

function MovieCard({ movie, onToggleFavorite, isFavorite = false }) {
  const {
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist
  } = useMovies();

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://placehold.co/300x450?text=No+Poster';

  const rating = movie.vote_average?.toFixed(1) ?? 'N/A';
  const year = movie.release_date?.substring(0, 4) || 'N/A';

  const inWatchlist = isInWatchlist(movie.id);

  const handleWatchlist = () => {
    if (inWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`}>
        <div className="movie-poster">
          <img src={posterUrl} alt={movie.title} />
        </div>
      </Link>

      <div className="movie-info">
        <Link to={`/movie/${movie.id}`}>
          <h3 className="movie-title">{movie.title}</h3>
        </Link>

        <div className="movie-details">
          <span className="movie-rating">⭐ {rating}</span>
          <span className="movie-year">{year}</span>
        </div>

        <button
          className="favorite-button"
          onClick={() => onToggleFavorite?.(movie)}
          disabled={!onToggleFavorite}
        >
          {isFavorite
            ? '♥ Remove Favorite'
            : '♡ Add to Favorites'}
        </button>

        <button
          className="watchlist-button"
          onClick={handleWatchlist}
        >
          {inWatchlist
            ? '✓ Remove from Watchlist'
            : '+ Add to Watchlist'}
        </button>
      </div>
    </div>
  );
}

export default MovieCard;
