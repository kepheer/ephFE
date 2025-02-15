<script setup>
import { ref } from "vue";

const isMenuOpen = ref(false);
const visible = ref(false);

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
            <BrandLogo class="h-[1.6em] w-auto shadow" />
          </NuxtLink>
        </div>

        <div class="hidden md:block" id="navbar">
          <HeaderNavbar />
        </div>

        <div class="flex items-center gap-4">
          <Button
            unstyled
            @click="visible = true"
            class="flex gap-4 rounded-xl bg-linear-65 from-eph-500 via-eph-700 to-eph-800 px-5 py-2.5 text-md font-bold shadow transition duration-300 hover:bg-linear-145"
          >
            <span class="hidden lg:inline">Войти в личный кабинет</span>
            <span class="lg:hidden">Войти</span>
          </Button>

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

  <Dialog
    v-model:visible="visible"
    modal
    dismissableMask
    :draggable="false"
    :closable="false"
    :style="{
      border: 'none',
    }"
    class="max-w-screen"
  >
    <template #header class="relative">
      <h4 class="font-head text-xl font-bold">
        <span
          class="hidden md:block bg-linear-65 from-eph via-eph-700 to-eph-blue-dark bg-clip-text text-transparent text-wrap"
          >ВХОД В ЛИЧНЫЙ КАБИНЕТ</span
        >
        <span
          class="block md:hidden bg-linear-65 from-eph via-eph-700 to-eph-blue-dark bg-clip-text text-transparent text-wrap"
          >ВХОД В LAB</span
        >
      </h4>
      <button
        @click="visible = false"
        class="absolute top-0 right-0 p-4 flex items-center justify-center text-eph-gray-dark hover:text-eph-black duration-300"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="p-icon"
          aria-hidden="true"
        >
          <path
            d="M8.01186 7.00933L12.27 2.75116C12.341 2.68501 12.398 2.60524 12.4375 2.51661C12.4769 2.42798 12.4982 2.3323 12.4999 2.23529C12.5016 2.13827 12.4838 2.0419 12.4474 1.95194C12.4111 1.86197 12.357 1.78024 12.2884 1.71163C12.2198 1.64302 12.138 1.58893 12.0481 1.55259C11.9581 1.51625 11.8617 1.4984 11.7647 1.50011C11.6677 1.50182 11.572 1.52306 11.4834 1.56255C11.3948 1.60204 11.315 1.65898 11.2488 1.72997L6.99067 5.98814L2.7325 1.72997C2.59553 1.60234 2.41437 1.53286 2.22718 1.53616C2.03999 1.53946 1.8614 1.61529 1.72901 1.74767C1.59663 1.88006 1.5208 2.05865 1.5175 2.24584C1.5142 2.43303 1.58368 2.61419 1.71131 2.75116L5.96948 7.00933L1.71131 11.2675C1.576 11.403 1.5 11.5866 1.5 11.7781C1.5 11.9696 1.576 12.1532 1.71131 12.2887C1.84679 12.424 2.03043 12.5 2.2219 12.5C2.41338 12.5 2.59702 12.424 2.7325 12.2887L6.99067 8.03052L11.2488 12.2887C11.3843 12.424 11.568 12.5 11.7594 12.5C11.9509 12.5 12.1346 12.424 12.27 12.2887C12.4053 12.1532 12.4813 11.9696 12.4813 11.7781C12.4813 11.5866 12.4053 11.403 12.27 11.2675L8.01186 7.00933Z"
            fill="currentColor"
          ></path>
        </svg>
      </button>
    </template>
    <form id="login" class="flex flex-col gap-2 max-w-sm mx-auto mt-3">
      <FloatLabel variant="on"
        ><InputText id="userlogin" v-model="login" type="text" fluid required />
        <label for="on_label">Логин</label></FloatLabel
      >
      <FloatLabel variant="on" class="w-full"
        ><InputText id="userpw" v-model="pw" type="password" fluid required />
        <label for="on_label">Пароль</label></FloatLabel
      >
      <Button
        unstyled
        type="submit"
        class="bg-gradient-to-r from-teal-700 via-teal-600 to-teal-800 text-white rounded-lg p-2 mt-2 transition duration-300 hover:from-teal-800 hover:via-teal-700 hover:to-teal-800"
      >
        Войти
      </Button>
    </form>
  </Dialog>
</template>
