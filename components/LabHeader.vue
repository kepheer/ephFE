<script setup lang="ts">
import { computed, ref, onMounted, watch } from "vue";
import { useUserStore } from "~/stores/user";
import { useInfoStore } from "~/stores/info";

const userStore = useUserStore();
const infoStore = useInfoStore();

const name = ref<string>("");

const loadName = async () => {
  const role = userStore.getRole;
  const id = userStore.getUserId;

  try {
    if (role === "artist") {
      await infoStore.getArtistInfo(id);
      name.value = infoStore.getName || "";
      console.log(name.value);
    } else {
      await infoStore.getManagerInfo(id);
      name.value = infoStore.getFirstName || "";
      сonsole.log(name.value);
    }
  } catch (error) {
    console.error("Ошибка при загрузке имени пользователя:", error);
  }
};

onMounted(() => {
  loadName();
});

watch(
  () => [userStore.getRole, userStore.getUserId],
  () => {
    loadName();
  }
);
</script>

<template>
  <header class="mx-auto py-2 bg-zinc-50 text-eph-gray-dark">
    <div class="mx-auto px-8">
      <div class="flex h-16 items-center justify-end">
        <div class="flex items-center gap-4">
          <span class="font-bold text-eph-black">{{ name }}</span>
          <UiuxUserMenu />
        </div>
      </div>
    </div>
  </header>
</template>
