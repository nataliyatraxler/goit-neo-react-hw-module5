import { useState } from 'react';
import { fetchMoviesByQuery } from '../../services/Api'; // Переконайтеся, що шлях правильний
import MovieList from '../../MovieList/MovieList'; // Список фільмів

const MoviesPage = () => {
  const [query, setQuery] = useState(''); // Для зберігання запиту
  const [movies, setMovies] = useState([]); // Для зберігання результатів пошуку
  const [error, setError] = useState(null); // Для обробки помилок

  const handleSearch = async (e) => {
    e.preventDefault(); // Забороняємо перезавантаження сторінки
    if (!query.trim()) {
      alert('Please enter a valid movie name!');
      return;
    }
    try {
      setError(null); // Скидаємо попередні помилки
      const data = await fetchMoviesByQuery(query); // Виконуємо запит
      if (data.length === 0) {
        alert('No movies found for this query.'); // Повідомлення, якщо немає результатів
      }
      setMovies(data); // Зберігаємо отримані фільми
    } catch (err) {
      console.error('Failed to fetch movies:', err);
      setError('Failed to fetch movies. Please try again later.');
    }
  };

  return (
    <div>
      <h1>Search Movies</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter movie name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Виводимо помилку */}
      {movies.length > 0 && <MovieList movies={movies} />} {/* Виводимо список фільмів */}
    </div>
  );
};

export default MoviesPage;
