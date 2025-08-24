<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold mb-6 text-center">Login</h1>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block mb-1 font-medium">Email</label>
          <input
            v-model="email"
            type="email"
            class="w-full border rounded px-3 py-2"
            placeholder="Enter your email"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block mb-1 font-medium">Password</label>
          <input
            v-model="password"
            type="password"
            class="w-full border rounded px-3 py-2"
            placeholder="Enter your password"
            required
          />
        </div>
        <div class="flex items-center justify-between mb-4">
          <label class="flex items-center">
            <input type="checkbox" v-model="rememberMe" class="mr-2" />
            Remember me
          </label>
          <a href="#" class="text-blue-600 hover:underline text-sm">Forgot password?</a>
        </div>
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
        <p class="mt-4 text-center text-sm text-gray-600">
          Don't have an account?
          <a href="#" class="text-blue-600 hover:underline">Sign up</a>
        </p>
      </form>

      <div v-if="errorMessage" class="mt-4 text-red-500 text-sm text-center">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const email = ref("");
const password = ref("");
const rememberMe = ref(false);
const errorMessage = ref("");

const handleLogin = () => {
  // Simple demo validation
  if (email.value === "demo@example.com" && password.value === "password") {
    alert(`Login successful! Remember me: ${rememberMe.value}`);
    errorMessage.value = "";
    email.value = "";
    password.value = "";
  } else {
    errorMessage.value = "Invalid email or password";
  }
};
</script>
