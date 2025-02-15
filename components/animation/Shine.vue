<script setup>
import { ref } from "vue";

const logos = ref([
  { src: "/images/logos/yandex-music.svg", alt: "Яндекс Музыка" },
  { src: "/images/logos/vk-music.svg", alt: "VK Музыка" },
  { src: "/images/logos/zvuk.svg", alt: "ЗВУК" },
  { src: "/images/logos/youtube.svg", alt: "Youtube" },
  { src: "/images/logos/apple-music.svg", alt: "Apple Music" },
  { src: "/images/logos/spotify.svg", alt: "Spotify" },
  { src: "/images/logos/tiktok.svg", alt: "TikTok" },
  { src: "/images/logos/mts-music.svg", alt: "МТС Музыка" },
  { src: "/images/logos/shazam.svg", alt: "Shazam" },
]);
</script>

<template>
  <article
    v-animateonscroll="{
      enterClass: 'animate-fadein',
      leaveClass: 'animate-fadeout',
    }"
    class="w-full duration-3000"
  >
    <div class="flex flex-wrap w-auto items-center justify-center">
      <div
        v-for="(logo, index) in logos"
        :key="index"
        class="h-8 md:h-10 lg:h-12 w-auto flex items-center justify-center mx-4 lg:mx-12 my-3 lg:my-5 animate-shine"
        :style="{ animationDelay: `${index}s` }"
      >
        <img
          :src="logo.src"
          :alt="logo.alt"
          loading="lazy"
          class="h-full object-contain"
        />
      </div>
    </div>
  </article>
</template>
