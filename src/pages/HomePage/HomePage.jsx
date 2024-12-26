import { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../../services/Api';
import MovieList from '../../pages/MovieList/MovieList';

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        const data = await fetchTrendingMovies();
        setMovies(data);
      } catch (error) {
        console.error('Failed to fetch trending movies:', error);
      }
    };
    getTrendingMovies();
  }, []);

  return (
    <div>
      <h1>Trending Today</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
