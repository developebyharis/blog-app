<template>
    <div class="min-h-screen p-6 bg-gray-50">
        <h1 class="text-3xl font-bold mb-6">Blog Manager</h1>

        <div class="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 class="text-xl font-semibold mb-4">{{ editingBlog ? "Edit Blog" : "Create Blog" }}</h2>
            <form @submit.prevent="editingBlog ? saveBlog() : addBlog()">
                <div class="mb-4">
                    <label class="block mb-1 font-medium">Title</label>
                    <input v-model="formBlog.title" type="text" class="w-full border rounded px-3 py-2" required />
                </div>
                <div class="mb-4">
                    <label class="block mb-1 font-medium">Content</label>
                    <textarea v-model="formBlog.content" class="w-full border rounded px-3 py-2" rows="5"
                        required></textarea>
                </div>
                <div class="mb-4">
                    <label class="block mb-1 font-medium">Author</label>
                    <input v-model="formBlog.author" type="text" class="w-full border rounded px-3 py-2" required />
                </div>
                <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                    {{ editingBlog ? "Update Blog" : "Create Blog" }}
                </button>
                <button type="button" v-if="editingBlog" @click="resetForm"
                    class="ml-2 px-4 py-2 rounded border hover:bg-gray-100 transition">
                    Cancel
                </button>
            </form>
        </div>

        <div>
            <h2 class="text-xl font-semibold mb-4">All Blogs</h2>
            <div v-if="loading" class="text-gray-500">Loading blogs...</div>
            <div v-else>
                <BlogCard v-for="blog in blogs" :key="blog.id" :blog="blog" @edit="editBlog" @delete="removeBlog" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { getBlogs, createBlog, updateBlog, deleteBlog } from "../services/blogService";
import BlogCard from "@/components/BlogCard.vue";

const blogs = ref([]);
const loading = ref(false);
const editingBlog = ref(null);
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
};

const editBlog = (blog) => {
    editingBlog.value = blog;
    Object.assign(formBlog, blog);
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
};

const removeBlog = async (id) => {
    if (confirm("Are you sure you want to delete this blog?")) {
        await deleteBlog(id);
        fetchBlogs();
    }
};

const resetForm = () => {
    editingBlog.value = null;
    Object.assign(formBlog, { title: "", content: "", author: "" });
};

onMounted(fetchBlogs);
</script>
