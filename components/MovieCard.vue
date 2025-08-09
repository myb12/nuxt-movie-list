<template>
  <div
    class="p-3 rounded-md shadow-md mb-2 cursor-grab transition-shadow duration-200"
    :class="statusClass"
    draggable="true"
    @dragstart="handleDragStart"
  >
    <div class="flex justify-between items-center mb-2">
      <h3 class="font-medium text-lg">{{ movie.name }}</h3>
      <button
        @click="isReviewModalOpen = true"
        class="bg-black text-white text-sm px-2 py-1 rounded-md hover:bg-gray-700 transition-colors"
      >
        Edit
      </button>
    </div>
    <p class="text-sm">
      <strong>Review:</strong> {{ movie.review ? movie.review : 'No review yet.' }}
    </p>
  </div>

  <Modal
    v-if="isReviewModalOpen"
    @close="isReviewModalOpen = false"
    :movie="movie"
    :status="status"
  />
</template>

<script setup>
import { ref } from 'vue'
import Modal from './Modal.vue'

const props = defineProps({
  movie: Object,
  status: String
});

const isReviewModalOpen = ref(false);

const statusClass = computed(() => {
  switch (props.status) {
    case 'watchList':
      return 'bg-gray-200';
    case 'watching':
      return 'bg-purple-600 text-white';
    case 'watched':
      return 'bg-gray-200';
    default:
      return 'bg-gray-200';
  }
});

const handleDragStart = (event) => {
  event.dataTransfer.setData('text/plain', JSON.stringify({ movieId: props.movie.id, fromStatus: props.status }));
  event.dataTransfer.effectAllowed = 'move';
};
</script>
