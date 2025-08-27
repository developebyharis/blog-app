<template>
  <div class="min-h-screen p-6 bg-gray-50">
    <!-- Header -->
    <div
      class="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 md:gap-0"
    >
      <h1 class="text-3xl font-bold text-gray-800">Blog Manager</h1>
      <div class="flex items-center gap-4">
        <div
          v-if="isAuthenticate"
          class="flex items-center gap-4 bg-white px-4 py-2 rounded-lg shadow-sm"
        >
          <div class="flex flex-col">
            <span class="font-semibold text-gray-800">{{ user.name }}</span>
            <span class="text-gray-500 text-sm">{{ user.email }}</span>
          </div>

          <div class="w-px h-6 bg-gray-300"></div>

          <Button
            label="Logout"
            icon="pi pi-sign-out"
            size="small"
            severity="danger"
            class="!px-3 !py-1 !rounded-md"
            @click="logoutUser"
          />
        </div>

        <Button
          label="Add Blog"
          icon="pi pi-plus"
          @click="openModal()"
          severity="info"
          size="small"
          class="!px-4 !py-2 !rounded-lg"
        />
      </div>
    </div>

    <!-- Search -->
    <div class="mb-6 flex justify-center">
      <InputText
        v-model="searchQuery"
        placeholder="🔍 Search blogs..."
        class="w-full max-w-md !bg-white"
      />
    </div>

    <!-- Blogs Grid -->
    <div class="space-y-4">
      <div v-if="loading" class="text-center text-gray-500">
        Loading blogs...
      </div>
      <div v-else>
        <div
          v-if="paginatedItems.length > 0"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <BlogCard
            v-for="blog in paginatedItems"
            :key="blog.id"
            :blog="blog"
            @edit="openModal(blog)"
            @delete="removeBlog"
            class="shadow-sm hover:shadow-md transition rounded-lg"
          />
        </div>
        <div v-else class="text-center text-gray-400 italic">
          No blogs found.
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex justify-center items-center gap-4 mt-6">
      <Button
        label="← Prev"
        @click="prevPage"
        :disabled="currentPage === 1"
        severity="secondary"
        outlined
        class="!px-5 !py-2 !rounded-lg"
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
        outlined
        class="!px-5 !py-2 !rounded-lg"
      />
    </div>

    <!-- Add/Edit Blog Modal -->
    <Dialog
      v-model:visible="showModal"
      modal
      :header="editingBlog ? 'Edit Blog' : 'Add Blog'"
      class="w-full max-w-lg"
    >
      <form @submit.prevent="editingBlog ? saveBlog() : addBlog()">
        <div class="mb-4">
          <label class="block mb-1 font-medium text-gray-700">Title</label>
          <InputText
            v-model="formBlog.title"
            class="w-full"
            placeholder="Enter title"
            required
          />
        </div>

        <div class="mb-4">
          <label class="block mb-1 font-medium text-gray-700">Content</label>
          <Textarea
            v-model="formBlog.content"
            rows="5"
            class="w-full"
            placeholder="Enter blog content..."
            required
          />
        </div>

        <div class="flex justify-end gap-2 mt-6">
          <Button
            label="Cancel"
            severity="secondary"
            outlined
            @click="closeModal"
          />
          <Button
            :label="editingBlog ? 'Update Blog' : 'Add Blog'"
            type="submit"
            severity="primary"
          />
        </div>
      </form>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../services/blogService";
import BlogCard from "@/components/BlogCard.vue";
import useSearch from "@/composables/useSearch.ts";
import { getUserFromToken, isAuthenticated, authState } from "@/utils/auth";
import { useRouter } from "vue-router";

const blogs = ref([]);
const loading = ref(false);
const editingBlog = ref(null);
const showModal = ref(false);
const formBlog = reactive({ title: "", content: "" });
const user = getUserFromToken();
const isAuthenticate = isAuthenticated();
const router = useRouter();

console.log("isAuthenticate", isAuthenticate);
console.log("user", user);

function logoutUser() {
  localStorage.removeItem("token");
  authState.isAuthenticated = false;
  authState.user = null;
  router.push("/login");
}
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
  if (!formBlog.title || !formBlog.content) return;
  await createBlog({ ...formBlog });
  Object.assign(formBlog, { title: "", content: "" });
  fetchBlogs();
  closeModal();
};

const openModal = (blog = null) => {
  editingBlog.value = blog;
  if (blog) Object.assign(formBlog, blog);
  else Object.assign(formBlog, { title: "", content: "" });
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  editingBlog.value = null;
  Object.assign(formBlog, { title: "", content: "" });
};

const saveBlog = async () => {
  if (!formBlog.title || !formBlog.content) return;
  await updateBlog(editingBlog.value.id, {
    title: formBlog.title,
    content: formBlog.content,
  });
  editingBlog.value = null;
  Object.assign(formBlog, { title: "", content: "" });
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

const {
  searchQuery,
  currentPage,
  paginatedItems,
  totalPages,
  nextPage,
  prevPage,
} = useSearch(blogs, ["title", "content"], 5);
</script>
