<script setup>
import { ref, onMounted } from "vue";
import { getBlogs } from "../services/blogService";
import BlogCard from "@/components/BlogCard.vue";
import useSearch from "@/composables/useSearch.jta";

const blogs = ref([]);
const fetchBlogs = async () => {
  const res = await getBlogs();
  blogs.value = res.data;
};
onMounted(fetchBlogs);

const {
  searchQuery,
  currentPage,
  paginatedItems: paginatedBlogs,
  totalPages,
  nextPage,
  prevPage,
} = useSearch(blogs, ["title", "content"], 5);
</script>

<template>
  <div class="max-w-4xl mx-auto p-6 space-y-6">
    <h1 class="text-3xl font-semibold text-gray-800">Blog Manager</h1>

    <!-- Search Input -->
    <div>
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search blogs..."
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 placeholder-gray-400"
      />
    </div>

    <!-- Blog List -->
    <div class="space-y-4">
      <div v-if="paginatedBlogs.length > 0">
        <div v-for="blog in paginatedBlogs" :key="blog.id">
          <BlogCard :blog="blog" class="shadow-sm hover:shadow-md transition-shadow rounded-lg"/>
        </div>
      </div>
      <div v-else>
        <p class="text-center text-gray-400 italic">No blogs found.</p>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex justify-center items-center space-x-3 mt-6">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        ← Prev
      </button>
      <span class="text-gray-600 font-medium">Page {{ currentPage }} of {{ totalPages }}</span>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        Next →
      </button>
    </div>
  </div>
</template>
