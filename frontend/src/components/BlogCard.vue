<script setup>
defineProps({
  blog: Object,
  onEdit: Function,
  onDelete: Function,
});
</script>

<template>
  <div class="p-4 mb-4 rounded shadow">
    <h2 class="text-lg font-bold">{{ blog.title }}</h2>
    <p class="text-gray-700 line-clamp-3">{{ blog.content }}</p>
    <p class="text-sm text-gray-500">— {{ blog.author }}</p>
    <div class="mt-2 flex gap-2">
      <RouterLink :to="`/blogs/${blog.id}`" class="text-blue-500 hover:underline">View</RouterLink>

      <button v-if="onEdit" @click="onEdit(blog)"
        class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
        Edit
      </button>

      <button v-if="onDelete" @click="onDelete(blog.id)"
        class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
        Delete
      </button>
    </div>
  </div>
</template>
