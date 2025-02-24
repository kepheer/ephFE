<script setup lang="ts">
import { ref } from "vue";
import { checkAuth } from "~/services/checkAuth";
import { navigateTo } from "#app";
import { useUserStore } from "~/stores/user";

const isMenuOpen = ref<boolean>(false);
const modalVisible = ref<boolean>(false);

const userStore = useUserStore();

const toggleMenu = (): void => {
  isMenuOpen.value = !isMenuOpen.value;
};

const handleAuthCheck = async (): Promise<void> => {
  await checkAuth({
    on200: (): void => {
      const role = userStore.getRole;

      if (role && ["artist", "manager", "root"].includes(role)) {
        navigateTo("/lab/");
      } else {
        console.warn("Недостаточно прав доступа");
        modalVisible.value = true;
      }
    },
    on401: (): void => {
      modalVisible.value = true;
    },
    on403: (): void => {
      modalVisible.value = true;
    },
    on500: (): void => {
      console.error("Внутренняя ошибка сервера");
    },
  });
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
          <Button
            unstyled
            @click="handleAuthCheck"
            class="flex gap-4 rounded-xl bg-linear-65 from-eph-500 via-eph-700 to-eph-800 px-5 py-2.5 text-md font-bold shadow transition duration-300 hover:bg-linear-145"
          >
            <span class="hidden lg:inline">Войти в личный кабинет</span>
            <span class="lg:hidden">Войти</span>
          </Button>
          <UiuxToogleBurger :isOpened="isMenuOpen" @toggle="toggleMenu" />
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
  <ModalLogin v-model="modalVisible" />
</template>
