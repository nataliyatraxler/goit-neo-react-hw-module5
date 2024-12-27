import axios from 'axios';

// Ваш API-ключ із TMDB
const API_KEY = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNjMyZGMwOTliZDczM2Q3ZDg3NWQ5ZWRiZTcwN2RmNiIsIm5iZiI6MTczNDU2NDcyOC42NjYsInN1YiI6IjY3NjM1Yjc4NjM4NTM2NTliZDRhNDBlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9tmU3lnnkdRDmhYEfo8YkyhUNzc4P60LUsObIWI4rT4';

// Базова URL-адреса API
const BASE_URL = 'https://api.themoviedb.org/3';

// Базова конфігурація axios
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: API_KEY },
});

// Запит трендових фільмів
export const fetchTrendingMovies = async () => {
  try {
    const response = await axiosInstance.get('/trending/movie/day');
    console.log('Trending Movies Response:', response.data.results); // Лог для перевірки
    return response.data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error.response || error.message);
    throw error;
  }
};

// Запит пошуку фільмів за ключовим словом
export const fetchMoviesByQuery = async (query) => {
  try {
    const response = await axiosInstance.get('/search/movie', {
      params: { query },
    });
    console.log('Movies by Query Response:', response.data.results); // Лог для перевірки
    return response.data.results;
  } catch (error) {
    console.error('Error fetching movies by query:', error.response || error.message);
    throw error;
  }
};

// Запит деталей фільму
export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await axiosInstance.get(`/movie/${movieId}`);
    console.log('Movie Details Response:', response.data); // Лог для перевірки
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error.response || error.message);
    throw error;
  }
};

// Запит акторського складу
export const fetchMovieCast = async (movieId) => {
  try {
    const response = await axiosInstance.get(`/movie/${movieId}/credits`);
    console.log('Movie Cast Response:', response.data.cast); // Лог для перевірки
    return response.data.cast;
  } catch (error) {
    console.error('Error fetching movie cast:', error.response || error.message);
    throw error;
  }
};

// Запит оглядів фільму
export const fetchMovieReviews = async (movieId) => {
  try {
    const response = await axiosInstance.get(`/movie/${movieId}/reviews`);
    console.log('Movie Reviews Response:', response.data.results); // Лог для перевірки
    return response.data.results;
  } catch (error) {
    console.error('Error fetching movie reviews:', error.response || error.message);
    throw error;
  }
};
