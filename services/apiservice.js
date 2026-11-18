const API_KEY = '62e8af194bc46e1edd34dde72cdc135e'; 
const BASE_URL = 'https://api.themoviedb.org/3';

export class ApiService {
  // Fetch Trending Movies
  static async fetchTrending() {
    try {
      const response = await fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('API Fetch Error (Trending):', error);
      return [];
    }
  }

  // Fetch Top Rated Movies
  static async fetchTopRated() {
    try {
      const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`);
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('API Fetch Error (Top Rated):', error);
      return [];
    }
  }

  // Fetch New / Upcoming Releases
  static async fetchNewReleases() {
    try {
      const response = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`);
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('API Fetch Error (New Releases):', error);
      return [];
    }
  }

  // Search Movies by Keyword
  static async searchMovies(query) {
    if (!query.trim()) return [];
    try {
      const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('API Fetch Error (Search):', error);
      return [];
    }
  }
}