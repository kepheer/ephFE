<template>
  <MainHeader />
  <AnimationFluid class="-z-10" />
  <main class="z-10">
    <slot />
  </main>
  <MainFooter />
</template>

<style>
body {
  color: var(--color-eph-white);
}
</style>