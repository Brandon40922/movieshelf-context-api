
function MovieCard({ movie, onToggleFavorite, isFavorite = false }) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://placehold.co/300x450?text=No+Poster';

  const rating = movie.vote_average?.toFixed(1) ?? 'N/A';
  const year = movie.release_date?.substring(0, 4) || 'N/A';

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={posterUrl} alt={movie.title} />
      </div>

      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>

        <div className="movie-details">
          <span className="movie-rating">⭐ {rating}</span>
          <span className="movie-year">{year}</span>
        </div>

        <button
          className="favorite-button"
          onClick={() => onToggleFavorite?.(movie)}
        >
          {isFavorite ? '♥ Remove Favorite' : '♡ Add to Favorites'}
        </button>
      </div>
    </div>
  );
}

export default MovieCard;
