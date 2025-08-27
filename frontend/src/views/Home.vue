<script setup>
import { ref, onMounted } from "vue";
import { getAllBlogs } from "../services/blogService";
import BlogCard from "@/components/BlogCard.vue";
import useSearch from "@/composables/useSearch.ts";

const blogs = ref([]);

const fetchBlogs = async () => {
  const res = await getAllBlogs();
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
} = useSearch(blogs, ["title", "content"], 6);
</script>

<template>
  <div class="p-8 bg-gray-50 min-h-screen">
    <h1 class="text-4xl font-bold text-gray-900 tracking-tight mb-8">
      Blog Manager
    </h1>

    <div class="flex justify-center mb-8">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="🔍 Search blogs..."
        class="w-full max-w-md px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring focus:ring-blue-400 placeholder-gray-400 text-gray-700"
      />
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-if="paginatedBlogs.length > 0"
        v-for="blog in paginatedBlogs"
        :key="blog.id"
      >
        <BlogCard :blog="blog" />
      </div>

      <div v-else class="col-span-full">
        <p class="text-center text-gray-500 italic text-lg">No blogs found.</p>
      </div>
    </div>

    <div class="flex justify-center items-center gap-5 mt-10">
      <Button
        label="← Prev"
        @click="prevPage"
        :disabled="currentPage === 1"
        severity="secondary"
        class="!px-6 !py-2 !rounded-lg"
      />
      <span class="text-gray-700 font-medium">
        Page <span class="font-bold">{{ currentPage }}</span> of
        {{ totalPages }}
      </span>
      <Button
        label="Next →"
        @click="nextPage"
        :disabled="currentPage === totalPages"
        severity="secondary"
        class="!px-6 !py-2 !rounded-lg"
      />
    </div>
  </div>
</template>
