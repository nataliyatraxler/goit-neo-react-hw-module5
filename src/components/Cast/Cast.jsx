import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchMovieCast } from '../../services/Api';

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const getMovieCast = async () => {
      try {
        const data = await fetchMovieCast(movieId);
        setCast(data);
      } catch (error) {
        console.error('Failed to fetch cast:', error);
      }
    };
    getMovieCast();
  }, [movieId]);

  if (!cast.length) return <p>No cast information available.</p>;

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {cast.map((actor) => (
        <li key={actor.id} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
          <img
            src={
              actor.profile_path
                ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                : 'https://via.placeholder.com/100x150'
            }
            alt={actor.name}
            style={{ marginRight: '10px', width: '100px', height: '150px', objectFit: 'cover' }}
          />
          <div>
            <p><strong>{actor.name}</strong></p>
            <p>Character: {actor.character}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Cast;
