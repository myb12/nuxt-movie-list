<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click.self="$emit('close')">
    <div class="bg-white p-6 rounded-lg shadow-xl w-96 max-w-sm">
      <h2 class="text-xl font-bold mb-4">{{ modalTitle }}</h2>
      <div class="mb-4">
        <label for="name" class="block text-sm font-medium text-gray-700">Name:</label>
        <input
          v-model="movieName"
          id="name"
          type="text"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      <div class="mb-4">
        <label for="review" class="block text-sm font-medium text-gray-700">Review:</label>
        <textarea
          v-model="movieReview"
          id="review"
          rows="3"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:outline-none focus:ring-2 focus:ring-purple-500"
        ></textarea>
      </div>
      <div class="flex justify-end space-x-2">
        <button
          @click="handleSave"
          class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
        >
          Save
        </button>
        <button
          @click="$emit('close')"
          class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useMovieStore } from '../stores/movieStore';

const props = defineProps({
  movie: Object,
  status: String
});

const emit = defineEmits(['close']);

const movieStore = useMovieStore();
const movieName = ref(props.movie?.name || '');
const movieReview = ref(props.movie?.review || '');

const modalTitle = computed(() => props.movie ? 'Edit Movie' : 'Add New Movie');

const handleSave = () => {
  if (props.movie) {
    // Edit existing movie
    movieStore.updateReview(props.movie.id, movieReview.value, props.status);
  } else {
    // Add new movie
    movieStore.addMovie({ name: movieName.value, review: movieReview.value });
  }
  emit('close');
};
</script>