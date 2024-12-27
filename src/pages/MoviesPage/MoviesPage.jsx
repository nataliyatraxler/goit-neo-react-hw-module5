import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchMoviesByQuery } from '../../services/Api';
import MovieList from '../../MovieList/MovieList';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  useEffect(() => {
    if (!query) return;

    const getMovies = async () => {
      try {
        const data = await fetchMoviesByQuery(query);
        setMovies(data);
      } catch (error) {
        console.error('Не вдалося завантажити фільми:', error);
      }
    };

    getMovies();
  }, [query]);

  const handleSearch = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const input = form.elements.query.value.trim();
    setSearchParams(input ? { query: input } : {});
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input type="text" name="query" defaultValue={query} placeholder="Пошук фільмів..." />
        <button type="submit">Шукати</button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
