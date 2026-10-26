
import MovieGrid from '../components/MovieGrid';

function Favorites({ favorites = [], onToggleFavorite }) {
  return (
    <main className="main-content">
      <div className="content-header">
        <h2>My Favorites</h2>
        <p>Your saved movies collection</p>
      </div>

      {favorites.length > 0 ? (
        <MovieGrid
          movies={favorites}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
        />
      ) : (
        <div className="empty-state">
          <p>
            No favorite movies yet.
            Start adding some from the home page!
          </p>
        </div>
      )}
    </main>
  );
}

export default Favorites;
