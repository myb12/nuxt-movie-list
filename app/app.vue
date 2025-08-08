<template>
  <div class="bg-gray-100 min-h-screen p-4">
    <div class="container mx-auto">
      <header class="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
        <div class="flex items-center w-full md:w-auto">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Type to search..."
            class="p-2 border rounded-l-md w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            class="bg-purple-600 text-white p-2 border border-l-0 rounded-r-md hover:bg-purple-700 transition-colors"
          >
            Search
          </button>
        </div>
        <button
          @click="isModalOpen = true"
          class="bg-purple-600 text-white p-2 rounded-md hover:bg-purple-700 transition-colors w-full md:w-auto"
        >
          Add New
        </button>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MovieBoard title="Watch List" status="watchList" :movies="filteredWatchList" />
        <MovieBoard title="Watching" status="watching" :movies="filteredWatching" />
        <MovieBoard title="Watched" status="watched" :movies="filteredWatched" />
      </div>

      <Modal v-if="isModalOpen" @close="isModalOpen = false" />
    </div>
  </div>
</template>

<script setup>
import { useMovieStore } from '../stores/movieStore'
import { ref, computed, onMounted, watch } from 'vue'
import MovieBoard from '../components/MovieBoard.vue'
import Modal from '../components/Modal.vue'

const movieStore = useMovieStore()
const isModalOpen = ref(false)
const searchQuery = ref('')

onMounted(() => {
  const storedState = localStorage.getItem('movieStore');
  if (storedState) {
    try {
      const parsedState = JSON.parse(storedState);
      if (parsedState.loaded) {
        movieStore.$patch(parsedState);
        return;
      }
    } catch (e) {
      console.error("Failed to parse stored state:", e);
      localStorage.removeItem('movieStore');
    }
  }
  
  // If no valid state is found, fetch from API
  movieStore.fetchMovies();
});

watch(
  () => movieStore.$state,
  (state) => {
    localStorage.setItem('movieStore', JSON.stringify(state));
  },
  { deep: true }
);

const filteredWatchList = computed(() => {
  return movieStore.watchList.filter(movie => movie.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
});

const filteredWatching = computed(() => {
  return movieStore.watching.filter(movie => movie.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
});

const filteredWatched = computed(() => {
  return movieStore.watched.filter(movie => movie.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
});
</script>
