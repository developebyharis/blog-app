<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getBlogs } from "@/services/blogService";

const route = useRoute();
const blog = ref(null);

const fetchBlog = async () => {
  const res = await getBlogs();
  blog.value = res.data.find(b => b.id === route.params.id);
};

onMounted(fetchBlog);
</script>

<template>
  <div class="max-w-3xl mx-auto p-6">
    <div v-if="blog">
      <h1 class="text-3xl font-bold mb-4">{{ blog.title }}</h1>
      <p class="text-gray-700 mb-6">{{ blog.content }}</p>
      <p class="text-sm text-gray-500">— {{ blog.author }}</p>
    </div>
    <div v-else>
      <p class="text-gray-500">Loading blog...</p>
    </div>
  </div>
</template>
