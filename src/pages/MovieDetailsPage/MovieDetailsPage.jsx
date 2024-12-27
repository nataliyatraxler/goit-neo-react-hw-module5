import { useParams, useLocation, useNavigate, NavLink, Outlet } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { fetchMovieDetails } from '../../services/Api';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const backLinkRef = useRef(location.state?.from || '/movies');
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        setError(null);
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (err) {
        console.error('Failed to fetch movie details:', err);
        setError('Failed to fetch movie details. Please try again later.');
      }
    };

    getMovieDetails();
  }, [movieId]);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <button onClick={() => navigate(backLinkRef.current)}>Go Back</button>
      {movie && (
        <>
          <div style={{ display: 'flex', marginTop: '20px' }}>
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                  : 'https://via.placeholder.com/300x450?text=No+Image'
              }
              alt={movie.title}
              style={{
                marginRight: '20px',
                width: '300px',
                height: '450px',
                objectFit: 'cover',
                borderRadius: '8px',
              }}
            />
            <div>
              <h1>{movie.title}</h1>
              <p><strong>Overview:</strong> {movie.overview}</p>
              <p><strong>Release Date:</strong> {movie.release_date}</p>
              <p><strong>Rating:</strong> {movie.vote_average} / 10</p>
            </div>
          </div>
          <nav style={{ marginTop: '20px' }}>
            <NavLink to="cast" style={{ marginRight: '10px' }}>Cast</NavLink>
            <NavLink to="reviews">Reviews</NavLink>
          </nav>
          <Outlet />
        </>
      )}
    </div>
  );
};

export default MovieDetailsPage;
