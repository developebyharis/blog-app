<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getAllBlogs } from "@/services/blogService";

const route = useRoute();
const blog = ref(null);
const loading = ref(true);

const fetchBlog = async () => {
  const res = await getAllBlogs();
  blog.value = res.data.find((b) => b.id === route.params.id);
  loading.value = false;
};

onMounted(fetchBlog);
</script>

<template>
  <div class="min-h-screen flex justify-center px-4 py-6">
    <div class="w-full max-w-3xl">
      <!-- Blog Skeleton Loader -->
      <div v-if="loading" class="space-y-4">
        <Skeleton height="2rem" width="80%" />
        <Skeleton height="1.5rem" width="90%" />
        <Skeleton height="1.5rem" width="95%" />
        <Skeleton height="1.5rem" width="60%" />
      </div>

      <!-- Blog Content -->
      <div v-else>
        <h1 class="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          {{ blog.title }}
        </h1>

        <p class="text-gray-700 text-lg leading-relaxed mb-6">
          {{ blog.content }}
        </p>

        <Divider />

        <p class="text-gray-500 italic text-right text-sm sm:text-base">
          — {{ blog.author.name }}
        </p>
      </div>
    </div>
  </div>
</template>
