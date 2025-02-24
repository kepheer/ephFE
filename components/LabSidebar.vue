<script setup lang="ts">
import { ref, onBeforeMount, onMounted, onUnmounted } from "vue";
import { useUserStore } from "~/stores/user";
import { navigateTo } from "#app";

const userStore = useUserStore();

const items = ref<Array<MenuItem>>([
  { label: "Дашборд", route: "/lab" },
  { label: "Артисты", route: "/lab/artists" },
  { label: "Менеджеры", route: "/lab/managers" },
  {
    label: "Релизы",
    items: [
      { label: "Новый релиз", route: "/lab/new" },
      { label: "Все релизы", route: "/lab/releases" },
    ],
  },
  {
    label: "Роялти",
    route: "/lab/royalties",
    items: [{ label: "Управление роялти", route: "/lab/royalties/manage" }],
  },
  {
    label: "Договоры",
    route: "/lab/contracts",
    items: [{ label: "Регистрация договора", route: "/lab/contracts/new" }],
  },
  { label: "Инструкции", route: "/lab/guides" },
  {
    label: "Пользователи",
    items: [
      { label: "Регистрация", route: "/lab/register" },
      { label: "Смена пароля", route: "/lab/changepw" },
      { label: "Все пользователи", route: "/lab/users" },
    ],
  },
]);

const expandedItems = ref<number[]>([]);
const isSidebarVisible = ref<boolean>(false);

type MenuItem = {
  label: string;
  route?: string;
  items?: MenuItem[];
};

const filterItemsByRole = (role: string): void => {
  items.value = items.value
    .map((item) => {
      if (role === "manager") {
        if (["Пользователи", "Менеджеры"].includes(item.label)) {
          return null;
        }
        if (item.label === "Роялти" && item.items) {
          return { ...item, items: undefined };
        }
        if (item.label === "Договоры" && item.items) {
          return { ...item, items: undefined };
        }
      } else if (role === "artist") {
        if (["Пользователи", "Менеджеры", "Артисты"].includes(item.label)) {
          return null;
        }
        if (item.label === "Роялти" && item.items) {
          return { ...item, items: undefined };
        }
        if (item.label === "Договоры" && item.items) {
          return { ...item, items: undefined };
        }
      }
      return item;
    })
    .filter(Boolean) as MenuItem[];
};

onBeforeMount(() => {
  const role = userStore.getRole;
  if (!role) {
    navigateTo("/");
  } else {
    filterItemsByRole(role);
  }
});

const updateSidebarVisibility = (): void => {
  isSidebarVisible.value = window.innerWidth >= 768;
};

onMounted(() => {
  updateSidebarVisibility();
  window.addEventListener("resize", updateSidebarVisibility);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateSidebarVisibility);
});

const toggleSidebar = (): void => {
  isSidebarVisible.value = !isSidebarVisible.value;
};

const toggleExpand = (index: number): void => {
  if (expandedItems.value.includes(index)) {
    expandedItems.value = expandedItems.value.filter((i) => i !== index);
  } else {
    expandedItems.value.push(index);
  }
};
</script>

<template>
  <div
    class="flex flex-col w-screen md:w-auto md:h-screen md:p-4 md:bg-zinc-50"
  >
    <div
      class="sticky flex items-center justify-between pl-4 py-1 md:p-4 bg-zinc-50"
    >
      <UiuxToogleBurger :isOpened="isSidebarVisible" @toggle="toggleSidebar" />
      <NuxtLink to="/lab" class="flex flex-nowrap items-baseline gap-2">
        <BrandLogo class="h-5 md:h-6 w-auto" />
        <span
          class="font-sans text-nowrap text-lg md:text-xl text-eph-gray-dark"
          >/ lab</span
        >
      </NuxtLink>
      <UiuxUserMenu class="block md:hidden" />
    </div>
    <nav
      v-if="isSidebarVisible"
      class="absolute md:static top-15.5 left-0 z-10 md:z-0 w-full mb-2 rounded-2xl bg-eph-white shadow-xl border-solid border-1 border-zinc-200"
    >
      <ol>
        <li
          v-for="(item, index) in items"
          :key="index"
          class="w-full flex items-center justify-between"
        >
          <template v-if="item.route && !item.items">
            <NuxtLink
              :to="item.route"
              class="font-medium rounded-2xl py-3 px-4 w-full hover:bg-zinc-200 border-1 border-zinc-200/10 hover:border-zinc-200"
            >
              {{ item.label }}
            </NuxtLink>
          </template>
          <template v-else-if="item.items">
            <div class="block w-full">
              <div
                v-if="item.route"
                class="flex justify-between w-full items-center cursor-pointer rounded-2xl border-1 border-zinc-200/10 hover:border-zinc-200"
              >
                <NuxtLink
                  :to="item.route"
                  class="font-medium rounded-l-2xl pl-4 py-3 w-full hover:bg-zinc-200"
                >
                  {{ item.label }}
                </NuxtLink>
                <div class="flex">
                  <Divider
                    layout="vertical"
                    class="border-s-1 border-s-zinc-200"
                    unstyled
                  />
                  <div
                    class="rounded-r-2xl h-full w-full py-3 px-4 hover:bg-zinc-200"
                  >
                    <UiuxToogleExpand
                      :expanded="expandedItems.includes(index)"
                      @click="toggleExpand(index)"
                      class="text-eph-gray-dark hover:text-eph-black"
                    />
                  </div>
                </div>
              </div>
              <div
                v-else
                class="flex justify-between items-center font-medium py-3 px-4 w-full cursor-pointer rounded-2xl border-1 border-zinc-200/10 hover:border-zinc-200 hover:bg-zinc-200 text-eph-gray-dark hover:text-eph-black"
                @click="toggleExpand(index)"
              >
                <span class="text-eph-black">{{ item.label }}</span>
                <UiuxToogleExpand
                  :expanded="expandedItems.includes(index)"
                  class=""
                />
              </div>
              <ul v-if="expandedItems.includes(index)">
                <li
                  v-for="(subitem, subIndex) in item.items"
                  :key="subIndex"
                  class="w-full flex items-center justify-between"
                >
                  <NuxtLink
                    :to="subitem.route"
                    class="w-full py-3 px-4 rounded-2xl hover:bg-zinc-200 border-1 border-zinc-200/10 hover:border-zinc-200"
                  >
                    {{ subitem.label }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </template>
        </li>
      </ol>
    </nav>
    <span class="hidden md:block text-eph-gray-light">&copy; ЭФИР 2025</span>
  </div>
</template>

<style scoped>
.router-link-exact-active {
  color: var(--color-eph-700);
}
</style>
