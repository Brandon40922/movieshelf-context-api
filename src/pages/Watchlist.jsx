
import { useMovies } from '../contexts/MovieContext';
import MovieGrid from '../components/MovieGrid';

function Watchlist() {
  const { watchlist, removeFromWatchlist } = useMovies();

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>My Watchlist</h2>
        <p>Movies you want to watch later</p>
      </div>

      {watchlist.length > 0 ? (
        <MovieGrid
          movies={watchlist}
          onRemove={removeFromWatchlist}
        />
      ) : (
        <div className="empty-state">
          <p>
            Your watchlist is empty.
            Add movies from the Home page!
          </p>
        </div>
      )}
    </main>
  );
}

export default Watchlist;
