<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useHead } from "#imports";
import { watch, onMounted } from "vue";

const route = useRoute();

const getBodyClass = () => {
  return route.meta.layout === "lab" ? "lab" : "default";
};

onMounted(() => {
  updateBodyClass();
});

watch(
  () => route.meta.layout,
  () => {
    updateBodyClass();
  }
);

const updateBodyClass = () => {
  const body = document.querySelector("body");

  body.className = ""; 

  const newClass = getBodyClass();
  if (newClass) {
    body.classList.add(newClass);
  }
};
</script>