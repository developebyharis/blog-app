import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import BlogDetail from "@/views/BlogDetail.vue";
import AdminPage from "@/views/Admin.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/blogs/:id", name: "BlogDetail", component: BlogDetail },
  { path: "/login", name: "login", component: Login },
  { path: "/register", name: "register", component: Register },
  {
    path: "/admin",
    name: "Admin",
    component: AdminPage,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(), // it clean the route
  routes,
});
router.beforeEach((to, from, next) => {
  // it like a middlware before go to each route
  const isAuthenticated = !!localStorage.getItem("token");

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: "login" }); // redirect to login if not auth
  } else {
    next();
  }
});
export default router;
