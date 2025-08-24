import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import BlogDetail from "@/views/BlogDetail.vue";
import AdminPage from "@/views/Admin.vue"

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/blogs/:id", name: "BlogDetail", component: BlogDetail },
  {path: "/admin", name: "Admin", component: AdminPage }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
