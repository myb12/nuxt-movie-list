<template>
  <div
    class="rounded-lg p-4 h-full min-h-[200px] shadow-md transition-shadow duration-300 hover:shadow-lg"
    :class="statusClass"
    @dragover.prevent
    @drop="handleDrop"
  >
    <h2 class="text-xl font-bold mb-4 capitalize text-gray-800 text-center">{{ title }}</h2>
    <div class="space-y-3">
      <div v-for="movie in movies" :key="movie.id">
        <MovieCard
          :movie="movie"
          :status="status"
        />
      </div>
      <p v-if="!isLoaded" class="text-center text-gray-500 italic p-4">
        Fetching movies...
      </p>
      <p v-else-if="isLoaded && movies.length === 0" class="text-center text-gray-500 italic p-4">
        No movies here yet.
      </p>
    </div>
  </div>
</template>

<script setup>
import { useMovieStore } from '../stores/movieStore'
import { computed } from 'vue'
import MovieCard from './MovieCard.vue'

const props = defineProps({
  title: String,
  status: String,
  movies: {
    type: Array,
    default: () => []
  }
});

const movieStore = useMovieStore();

const isLoaded = computed(() => movieStore.loaded);

const statusClass = computed(() => {
  switch (props.status) {
    case 'watchList':
      return 'bg-orange-300';
    case 'watching':
      return 'bg-cyan-300';
    case 'watched':
      return 'bg-green-400';
    default:
      return 'bg-gray-50';
  }
});

// Handle the drop event.
// Retrieves the data and moves the movie to the new status.
const handleDrop = (event) => {
  const data = event.dataTransfer.getData('text/plain');
  if (!data) return;

  const { movieId, fromStatus } = JSON.parse(data);

  if (fromStatus !== props.status) {
    movieStore.moveMovie(movieId, fromStatus, props.status);
  }
};
</script>
