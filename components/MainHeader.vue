<script setup>
import { ref } from "vue";

const isMenuOpen = ref < Boolean > false;

const toggleMenu = () => {
  isMenuOpen.valueOf = !isMenuOpen.valueOf;
};
</script>

<template>
  <header class="mx-auto py-2 sticky top-0 z-20 bg-eph-black/80 backdrop-blur">
    <div class="mx-auto max-w-screen-xl px-8">
      <div class="flex h-16 items-center justify-between">
        <div class="md:flex md:items-center md:gap-12">
          <NuxtLink to="/" class="block">
            <BrandLogo class="h-[1.6em] w-auto" />
          </NuxtLink>
        </div>

        <div class="hidden md:block" id="navbar">
          <HeaderNavbar />
        </div>

        <div class="flex items-center gap-4">
          <button
            class="flex gap-4 rounded-xl bg-gradient-to-r from-teal-700 via-eph to-teal-800 px-5 py-2.5 text-md font-bold shadow transition duration-300 hover:from-teal-800 hover:via-eph hover:to-teal-800"
          >
            <span class="hidden lg:inline">Войти в личный кабинет</span>
            <span class="lg:hidden">Войти</span>
          </button>

          <button
            @click="toggleMenu"
            :aria-expanded="isMenuOpen.toString()"
            aria-controls="navbar"
            class="block md:hidden"
          >
            <svg
              v-if="!isMenuOpen"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-6"
            >
              <path
                fill-rule="evenodd"
                d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                clip-rule="evenodd"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-6"
            >
              <path
                fill-rule="evenodd"
                d="M11.47 7.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div
      v-if="isMenuOpen"
      id="navbar"
      class="container absolute pb-2 md:hidden bg-eph-black/80 backdrop-blur"
    >
      <HeaderNavbar />
    </div>
  </header>
</template>
