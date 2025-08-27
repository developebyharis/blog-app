<template>
  <div class="p-card p-4 w-96 mx-auto mt-10">
    <h2 class="text-xl mb-4">Register</h2>
    <div class="p-fluid">
      <span class="p-float-label mb-4">
        <InputText id="name" v-model="name" />
        <label for="name">Name</label>
      </span>

      <span class="p-float-label mb-4">
        <InputText id="email" v-model="email" />
        <label for="email">Email</label>
      </span>

      <span class="p-float-label mb-4">
        <Password id="password" v-model="password" toggleMask />
        <label for="password">Password</label>
      </span>

      <Button label="Register" icon="pi pi-user-plus" @click="handleRegister" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { register } from "../services/authService";
import { useRouter } from "vue-router";

const name = ref("");
const email = ref("");
const password = ref("");
const router = useRouter();

async function handleRegister() {
  try {
    const res = await register({
      name: name.value,
      email: email.value,
      password: password.value,
    });
    alert("Registration successful! Now login.");
    router.push("/login");
  } catch (err) {
    alert("Error: " + err.response.data.message);
  }
}
</script>
