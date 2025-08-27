<template>
  <div class="p-card p-4 w-96 mx-auto mt-10">
    <h2 class="text-xl mb-4">Login</h2>
    <div class="p-fluid">
      <span class="p-float-label mb-4">
        <InputText id="email" v-model="email" />
        <label for="email">Email</label>
      </span>

      <span class="p-float-label mb-4">
        <Password id="password" v-model="password" toggleMask />
        <label for="password">Password</label>
      </span>

      <Button
        label="Login"
        icon="pi pi-sign-in"
        size="small"
        @click="handleLogin"
      />
      <Button
        label="Register"
        as="router-link"
        :to="`/register`"
        severity="info"
        size="small"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { login, setAuthHeader } from "../services/authService";

import { useRouter } from "vue-router";
const email = ref("");
const password = ref("");
const router = useRouter();
async function handleLogin() {
  try {
    const res = await login({ email: email.value, password: password.value });
    const token = res.data.access_token;

    // save token
    localStorage.setItem("token", token);
    setAuthHeader(token);

    alert("Login successful!");
    router.push("/admin");
  } catch (err) {
    alert("Error: " + err.response.data.message);
  }
}
</script>
