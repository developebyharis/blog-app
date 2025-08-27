<script setup>
import { useRoute } from "vue-router";

defineProps({
  blog: Object,
  onEdit: Function,
  onDelete: Function,
});

const route = useRoute();
</script>

<template>
  <div
    class="p-5 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 justify-between"
  >
    <div class="mb-3">
      <h2 class="text-lg font-semibold text-gray-800 mb-1 truncate">
        {{ blog.title }}
      </h2>
      <p class="text-gray-600 text-sm line-clamp-3">{{ blog.content }}</p>
    </div>

    <div class="flex justify-between items-center mt-4">
      <p v-if="route.path === '/'" class="text-gray-400 text-xs italic">
      — {{ blog.author.name }}
    </p>
      <div class="flex gap-2">
        <Button
          label="View"
          as="router-link"
          :to="`/blogs/${blog.id}`"
          severity="info"
          size="small"
        />

        <!-- Edit Button -->
        <Button
          label="Edit"
          severity="warn"
          size="small"
          v-if="onEdit"
          @click="onEdit(blog)"
        />

        <!-- Delete Button -->
        <Button
          label="Delete"
          severity="danger"
          size="small"
          v-if="onDelete"
          @click="onDelete(blog.id)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
