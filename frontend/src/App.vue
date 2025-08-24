<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <nav class="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <div class="text-xl font-bold">My Blog App</div>
      <ul class="flex space-x-6 gap-4">
        <li>
          <RouterLink to="/" class="hover:text-blue-600 transition">Home</RouterLink>
        </li>
        <li>
          <RouterLink to="/admin" class="hover:text-blue-600 transition">Admin</RouterLink>
        </li>
      </ul>
    </nav>

    <main class="flex-1 p-6">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterView, RouterLink } from "vue-router";
</script>
