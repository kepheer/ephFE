<template>
  <div class="w-[100dvw] max-w-full overflow-hidden md:flex md:flex-row">
    <aside class="flex md:block md:w-[18rem] md:flex-shrink-0 m-0 p-0 md:ml-4">
      <LabSidebar />
    </aside>
    <main class="md:flex-grow m-0 p-0 overflow-auto">
      <LabHeader class="hidden md:block" />
      <slot></slot>
    </main>
  </div>
</template>
