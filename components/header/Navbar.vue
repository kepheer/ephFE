<template>
  <nav aria-label="Global">
    <ul
      class="flex flex-col md:flex-row items-center gap-2 md:gap-8 lg:gap-16 md:text-md lg:text-lg font-semibold"
    >
      <li>
        <NuxtLink
          to="/about"
          class="transition duration-300 hover:text-white/75"
          >О лейбле</NuxtLink
        >
      </li>
      <li>
        <NuxtLink
          to="/ability"
          class="transition duration-300 hover:text-white/75"
          >Возможности</NuxtLink
        >
      </li>
      <li>
        <NuxtLink to="/faq" class="transition duration-300 hover:text-white/75"
          >FAQ</NuxtLink
        >
      </li>
      <li>
        <NuxtLink
          to="/contact"
          class="transition duration-300 hover:text-white/75"
          >Связаться с нами</NuxtLink
        >
      </li>
    </ul>
  </nav>
</template>
