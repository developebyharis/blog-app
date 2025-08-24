<script setup>
import { ref, onMounted } from "vue";
import { getBlogs } from "../services/blogService";
import BlogCard from "@/components/BlogCard.vue";

const blogs = ref([]);
const fetchBlogs = async () => {
  const res = await getBlogs();
  blogs.value = res.data;
};


onMounted(fetchBlogs);
</script>

<template>
  <div class=" p-6">
    <h1 class="text-2xl font-bold mb-4">📖 Blog Manager</h1>
    <div v-for="blog in blogs" :key="blog.id">
      <BlogCard :blog="blog" />
    </div>
  </div>
</template>
