import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid';

export const useMovieStore = defineStore('movieStore', {
  state: () => ({
    watchList: [],
    watching: [],
    watched: [],
    loaded: false,
  }),
  actions: {
    addMovie(movieData) {
      const newMovie = {
        id: uuidv4(),
        ...movieData,
        status: 'watchList',
      };
      this.watchList.push(newMovie);
    },
    updateReview(movieId, newReview, status) {
      const list = this[status];
      const movieToUpdate = list.find(movie => movie.id === movieId);
      if (movieToUpdate) {
        movieToUpdate.review = newReview;
      }
    },
    moveMovie(movieId, fromStatus, toStatus) {
      if (fromStatus === toStatus) return;

      const fromList = this[fromStatus];
      const toList = this[toStatus];

      const movieIndex = fromList.findIndex(movie => movie.id === movieId);
      if (movieIndex !== -1) {
        const [movieToMove] = fromList.splice(movieIndex, 1);
        movieToMove.status = toStatus;
        toList.push(movieToMove);
      }
    },
    async fetchMovies() {
      try {
        const response = await fetch('http://localhost:3000/api/movies');
        if (!response.ok) {
          throw new Error(`API call failed with status: ${response.status}`);
        }
        const apiData = await response.json();
        
        const initialMovies = apiData.map(movie => ({
          ...movie,
          status: 'watchList'
        }));
        
        this.watchList = initialMovies;
        this.watching = [];
        this.watched = [];
        this.loaded = true;
      } catch (error) {
        console.error("Failed to fetch movies from API:", error);
      }
    },
  },
})
