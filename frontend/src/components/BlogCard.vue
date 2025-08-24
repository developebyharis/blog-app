<script setup>
defineProps({
  blog: Object,
  onEdit: Function,
  onDelete: Function,
});
</script>

<template>
  <div
    class="p-5 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between">
    <div class="mb-3">
      <h2 class="text-lg font-semibold text-gray-800 mb-1 truncate">{{ blog.title }}</h2>
      <p class="text-gray-600 text-sm line-clamp-3">{{ blog.content }}</p>
    </div>

    <div class="flex justify-between items-center mt-4">
      <p class="text-gray-400 text-xs italic">— {{ blog.author }}</p>
      <div class="flex gap-2">
        <RouterLink :to="`/blogs/${blog.id}`"
          class="text-blue-500 text-sm hover:underline  px-2 py-1 rounded hover:bg-blue-100 transition">
          View
        </RouterLink>
        <button v-if="onEdit" @click="onEdit(blog)"
          class="text-yellow-600 text-sm px-2 py-1 rounded hover:bg-yellow-100 transition">
          Edit
        </button>
        <button v-if="onDelete" @click="onDelete(blog.id)"
          class="text-red-600 text-sm px-2 py-1 rounded hover:bg-red-100 transition">
          Delete
        </button>
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
