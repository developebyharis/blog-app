<template>
  <div class="min-h-screen p-6 bg-gray-50">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-800">Blog Manager</h1>
      <button
        @click="openModal()"
        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        + Add Blog
      </button>
    </div>

    <!-- Search Input -->
    <div class="mb-6">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search blogs..."
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 placeholder-gray-400"
      />
    </div>

    <!-- Blog List -->
    <div class="space-y-4">
      <div v-if="loading" class="text-gray-500">Loading blogs...</div>
      <div v-else>
        <div v-if="paginatedItems.length > 0">
          <BlogCard
            v-for="blog in paginatedItems"
            :key="blog.id"
            :blog="blog"
            @edit="openModal(blog)"
            @delete="removeBlog"
            class="shadow-sm hover:shadow-md transition rounded-lg"
          />
        </div>
        <div v-else>
          <p class="text-center text-gray-400 italic">No blogs found.</p>
        </div>
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

    <!-- Add/Edit Blog Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 backdrop-blur-xs bg-black/20 flex justify-center items-center z-50"
    >
      <div class="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <h2 class="text-xl font-semibold mb-4">
          {{ editingBlog ? "Edit Blog" : "Add Blog" }}
        </h2>
        <form @submit.prevent="editingBlog ? saveBlog() : addBlog()">
          <div class="mb-4">
            <label class="block mb-1 font-medium">Title</label>
            <input
              v-model="formBlog.title"
              type="text"
              class="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div class="mb-4">
            <label class="block mb-1 font-medium">Content</label>
            <textarea
              v-model="formBlog.content"
              class="w-full border rounded px-3 py-2"
              rows="5"
              required
            ></textarea>
          </div>
          <div class="mb-4">
            <label class="block mb-1 font-medium">Author</label>
            <input
              v-model="formBlog.author"
              type="text"
              class="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div class="flex justify-end space-x-2">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 rounded border hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              {{ editingBlog ? "Update Blog" : "Add Blog" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { getBlogs, createBlog, updateBlog, deleteBlog } from "../services/blogService";
import BlogCard from "@/components/BlogCard.vue";
import useSearch from "@/composables/useSearch.ts";

const blogs = ref([]);
const loading = ref(false);
const editingBlog = ref(null);
const showModal = ref(false);
const formBlog = reactive({ title: "", content: "", author: "" });

const fetchBlogs = async () => {
  loading.value = true;
  try {
    const res = await getBlogs();
    blogs.value = res.data;
  } catch (err) {
    console.error("Failed to fetch blogs:", err);
  } finally {
    loading.value = false;
  }
};

const addBlog = async () => {
  if (!formBlog.title || !formBlog.content || !formBlog.author) return;
  await createBlog({ ...formBlog });
  Object.assign(formBlog, { title: "", content: "", author: "" });
  fetchBlogs();
  closeModal();
};

const openModal = (blog = null) => {
  editingBlog.value = blog;
  if (blog) Object.assign(formBlog, blog);
  else Object.assign(formBlog, { title: "", content: "", author: "" });
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  editingBlog.value = null;
  Object.assign(formBlog, { title: "", content: "", author: "" });
};

const saveBlog = async () => {
    if (!formBlog.title || !formBlog.content || !formBlog.author) return;
    await updateBlog(editingBlog.value.id, {
        title: formBlog.title,
        content: formBlog.content,
        author: formBlog.author
    });
    editingBlog.value = null;
    Object.assign(formBlog, { title: "", content: "", author: "" });
    fetchBlogs();
      closeModal();

};

const removeBlog = async (id) => {
  if (confirm("Are you sure you want to delete this blog?")) {
    await deleteBlog(id);
    fetchBlogs();
  }
};

onMounted(fetchBlogs);

const { searchQuery, currentPage, paginatedItems, totalPages, nextPage, prevPage } =
  useSearch(blogs, ["title", "content"], 5);
</script>
