import { useParams, useNavigate, Outlet, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchMovieDetails } from '../../services/Api';
import { lazy, Suspense } from 'react';

const Cast = lazy(() => import('../../components/Cast/Cast'));
const Reviews = lazy(() => import('../../components/Reviews/Reviews'));

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setError('Failed to load movie details. Please try again later.');
      }
    };
    getMovieDetails();
  }, [movieId]);

  const handleGoBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!movie) {
    return <p>Loading...</p>;
  }

  const { title, overview, genres, vote_average, poster_path } = movie;

  return (
    <div>
      <button onClick={handleGoBack} style={{ marginBottom: '20px' }}>
        ← Go Back
      </button>
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w300${poster_path}`
              : 'https://via.placeholder.com/300x450'
          }
          alt={title}
          style={{ width: '300px', height: '450px', objectFit: 'cover' }}
        />
        <div>
          <h1>{title}</h1>
          <p>
            <strong>User Score:</strong> {Math.round(vote_average * 10)}%
          </p>
          <h2>Overview</h2>
          <p>{overview}</p>
          <h2>Genres</h2>
          <p>{genres.map((genre) => genre.name).join(', ') || 'No genres available'}</p>
        </div>
      </div>
      <div>
        <h2>Additional Information</h2>
        <nav>
          <NavLink to="cast" style={{ marginRight: '10px' }}>
            Cast
          </NavLink>
          <NavLink to="reviews">Reviews</NavLink>
        </nav>
      </div>
      {/* Suspense для дочірніх маршрутів */}
      <Suspense fallback={<p>Loading additional details...</p>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
