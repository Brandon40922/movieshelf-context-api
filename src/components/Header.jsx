
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery.trim());
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-content">

        <Link to="/" className="app-title">
          MovieShelf
        </Link>

        <nav className="nav-links">
          <Link to="/" className="nav-link">
            Home
          </Link>

          <Link to="/watchlist" className="nav-link">
            Watchlist
          </Link>

          <Link to="/favorites" className="nav-link">
            Favorites
          </Link>
        </nav>

        <form
          className="search-container"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            placeholder="Search movies..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => {
              const value = e.target.value;
              setSearchQuery(value);
              onSearch(value.trim());
            }}
          />

          <button type="submit" className="search-button">
            Search
          </button>
        </form>

      </div>
    </header>
  );
}

export default Header;

