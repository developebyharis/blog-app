<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getBlogs } from "@/services/blogService";

const route = useRoute();
const blog = ref(null);

const fetchBlog = async () => {
  const res = await getBlogs();
  blog.value = res.data.find((b) => b.id === route.params.id);
};

onMounted(fetchBlog);
</script>

<template>
  <div class="min-h-screen py-8 px-4">
    <div v-if="blog" class=" p-6 sm:p-8">
      <h1 class="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">
        {{ blog.title }}
      </h1>

      <p class="text-gray-700 text-base sm:text-lg leading-relaxed mb-6">
        {{ blog.content }}
      </p>

      <p class="text-gray-400 text-sm sm:text-base italic text-right">
        — {{ blog.author }}
      </p>
    </div>

    <div v-else class="text-center text-gray-500 mt-20">
      Loading blog...
    </div>
  </div>
</template>
