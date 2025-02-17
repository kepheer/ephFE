<script setup>
import { useUserStore } from "~/stores/user";

const userStore = useUserStore();
</script>

<template>
  <h1>User ID: {{ userStore.getUserId }}</h1>
  <p>Login: {{ userStore.getLogin }}</p>
  <p>Role: {{ userStore.getRole }}</p>
</template>
