import React from "react";

const API_KEY = "62e8af194bc46e1edd34dde72cdc135e";

export const fetchMoviesFromAPI = async (query = "") => {
  try {
    let url = "";
    if (query.trim() === "") {
      url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
    } else {
      url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("API Fetch Error:", error);
    return [];
  }
}