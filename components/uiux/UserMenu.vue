<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "~/stores/user";
import { api } from "~/utils/axios.config";
import { navigateTo } from "#app";
import { useCookie } from "#app";

const userStore = useUserStore();

const menu = ref<any>(null);
const isMenuVisible = ref<boolean>(false);

interface MenuItem {
  label?: string;
  route?: string;
  separator?: boolean;
  command?: () => void;
}

const items = ref<Array<MenuItem>>([
  { label: "Настройки", route: "/lab/settings" },
  { label: "Вернуться на сайт", route: "/" },
  { separator: true },
  { label: "Выйти", command: logout },
]);

async function logout(): Promise<void> {
  toggleMenu();

  try {
    const id = userStore.getUserId;

    if (id) {
      const response = await api.post<{ status: number }>(`/auth/${id}/logout`);
      if (response.status === 200) {
        console.log("Выход выполнен успешно");
      }
    }
    clearUserCookies();
    userStore.logout();
    navigateTo("/", { external: true });
  } catch (error: any) {
    console.error("Ошибка выхода из системы:", error);
    handleLogoutError(error);

    clearUserCookies();
    userStore.logout();
    navigateTo("/", { external: true });
  }
}

const clearUserCookies = () => {
  const cookieToken = useCookie("token");
  const cookieUserId = useCookie("userId");
  const cookieLogin = useCookie("login");
  const cookieRole = useCookie("role");

  cookieToken.value = null;
  cookieUserId.value = null;
  cookieLogin.value = null;
  cookieRole.value = null;
};

const handleLogoutError = (error: any) => {
  if (error.response) {
    const status = error.response.status;

    if ([401, 404, 500].includes(status)) {
      console.error(
        error.response.data?.message || "Произошла ошибка при выходе"
      );
    } else {
      console.error("Неизвестная ошибка сервера");
    }
  } else if (error.request) {
    console.error("Нет ответа от сервера");
  } else {
    console.error(`Ошибка сервера: ${error.message}`);
  }
};

function toggleMenu(event?: Event): void {
  menu.value?.toggle(event);
}

function onMenuFocus(): void {
  isMenuVisible.value = true;
}

function onMenuBlur(): void {
  isMenuVisible.value = false;
}
</script>

<template>
  <div>
    <Menu
      ref="menu"
      :model="items"
      :popup="true"
      @focus="onMenuFocus"
      @blur="onMenuBlur"
    >
      <template #start>
        <span class="inline-flex px-4 pt-3 pb-1 font-bold">
          {{ userStore.getLogin || "Логин" }}
        </span>
      </template>
      <template #item="{ item, props }">
        <router-link
          v-if="item.route"
          v-slot="{ href, navigate }"
          :to="item.route"
          custom
        >
          <a v-ripple :href="href" v-bind="props.action" @click="navigate">
            <span>{{ item.label }}</span>
          </a>
        </router-link>
        <a v-else v-ripple v-bind="props.action" @click="logout()">
          <span class="text-eph-red">{{ item.label }}</span>
        </a>
      </template>
    </Menu>
    <Button
      type="button"
      @click="toggleMenu"
      class="rounded-full p-4 flex gap-2 hover:text-eph-black duration-300"
      unstyled
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="size-6"
      >
        <path
          fill-rule="evenodd"
          d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
          clip-rule="evenodd"
        />
      </svg>
      <UiuxToogleExpand :expanded="isMenuVisible" />
    </Button>
  </div>
</template>
