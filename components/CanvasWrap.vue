<script setup>
import { onMounted, onUnmounted } from "vue";
import { initFluid } from "../utils/fluid";

onMounted(() => {
  initFluid();
});

onUnmounted(() => {
  window.removeEventListener("mousemove", (e) => {});
  window.removeEventListener("touchstart", (e) => {});
  window.removeEventListener("touchend", (e) => {});
});
</script>

<template>
  <canvas class="fixed top-0 left-0 w-[100dvw] h-[100dvh]"></canvas>
</template>
