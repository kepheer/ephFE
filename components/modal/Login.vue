<script setup lang="ts">
import { ref, watch } from "vue";
import { useUserStore } from "~/stores/user";
import { navigateTo } from "#app";
import { api } from "~/utils/axios.config";

const props = defineProps({
  modelValue: {
    type: Boolean as () => boolean,
    required: true,
  },
});

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

const visible = ref<boolean>(props.modelValue);
const login = ref<string>("");
const pw = ref<string>("");
const errorMessage = ref<string>("");

watch(
  () => props.modelValue,
  (newValue: boolean) => {
    visible.value = newValue;
    errorMessage.value = "";
  }
);

const closeDialog = (): void => {
  emit("update:modelValue", false);
};

const userStore = useUserStore();

const onInput = (): void => {
  errorMessage.value = "";
};

const handleLogin = async (): Promise<void> => {
  try {
    const response = await api.post<{
      id: string;
      login: string;
      role: string;
      token?: string;
    }>("/auth/login", {
      login: login.value,
      password: pw.value,
    });

    if (response.status === 200) {
      const { id, login: userLogin, role, token } = response.data;

      if (process.client) {
        const cookieToken = useCookie("token");
        const cookieUserId = useCookie("userId");
        const cookieLogin = useCookie("login");
        const cookieRole = useCookie("role");

        cookieToken.value = token || "";
        cookieUserId.value = id;
        cookieLogin.value = userLogin;
        cookieRole.value = role;
      }

      userStore.login({
        id,
        login: userLogin,
        role,
      });

      closeDialog();
      navigateTo("/lab/");
    }
  } catch (error: any) {
    if (error.response) {
      const status = error.response.status;
      if ([401, 400, 500].includes(status)) {
        errorMessage.value = error.response.data.message || "Произошла ошибка";
      } else {
        errorMessage.value = "Неизвестная ошибка";
      }
    } else if (error.request) {
      errorMessage.value = "Нет ответа от сервера";
    } else {
      errorMessage.value = `Ошибка сервера: ${error.message}`;
    }
  }
};
</script>

<template>
  <Dialog
    v-model:visible="visible"
    modal
    dismissableMask
    :draggable="false"
    :closable="false"
    :style="{ border: 'none' }"
    class="max-w-screen"
    @update:visible="emit('update:modelValue', $event)"
  >
    <template #header>
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
        @click="closeDialog"
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
    <form
      id="login"
      class="flex flex-col gap-2 max-w-sm mx-auto mt-3"
      @submit.prevent="handleLogin"
    >
      <FloatLabel variant="on">
        <InputText
          id="userlogin"
          v-model="login"
          type="text"
          fluid
          required
          @input="onInput"
        />
        <label for="on_label">Логин</label>
      </FloatLabel>
      <FloatLabel variant="on" class="w-full">
        <Password
          id="userpw"
          v-model="pw"
          type="password"
          :feedback="false"
          toggleMask
          fluid
          required
          @input="onInput"
        />
        <label for="on_label">Пароль</label>
      </FloatLabel>
      <p v-if="errorMessage" class="text-eph-red text-sm">{{ errorMessage }}</p>
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
