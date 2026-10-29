
import { createContext, useContext, useEffect, useState } from "react";

const MovieContext = createContext();

export function MovieProvider({ children }) {
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const savedWatchlist = localStorage.getItem("watchlist");
      return savedWatchlist ? JSON.parse(savedWatchlist) : [];
    } catch {
      return [];
    }
  });

  const addToWatchlist = (movie) => {
    setWatchlist((prev) => {
      if (prev.some((item) => item.id === movie.id)) {
        return prev;
      }
      return [...prev, movie];
    });
  };

  const removeFromWatchlist = (movieId) => {
    setWatchlist((prev) =>
      prev.filter((movie) => movie.id !== movieId)
    );
  };

  const isInWatchlist = (movieId) => {
    return watchlist.some((movie) => movie.id === movieId);
  };

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  return (
    <MovieContext.Provider
      value={{
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        isInWatchlist,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export function useMovies() {
  return useContext(MovieContext);
}