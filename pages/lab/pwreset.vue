<script setup lang="ts">
import { ref } from "vue";
import { ValidationService } from "@/services/validator";
import ToogleSwitch from "primevue/toggleswitch";
import { useToast } from "primevue/usetoast";
import { changePassword } from "@/services/changePassword";

definePageMeta({
  layout: "lab",
});

const id = ref<string>("");
const newpw = ref<string>("");
const errorMessage = ref<string>("");
const toast = useToast();
const sended = ref<boolean>(false);

const validate = (): boolean => {
  const passwordResult = ValidationService.validatePassword(newpw.value);
  if (!passwordResult.isValid) {
    errorMessage.value = passwordResult.message!;
    return false;
  }
  return true;
};

const clear = (): void => {
  errorMessage.value = "";
};

const resetPasswordHandler = async (): Promise<void> => {
  if (!id.value) {
    errorMessage.value = "ID пользователя обязателен";
    return;
  }

  changePassword(id.value, newpw.value, {
    on200: (message) => {
      toast.add({
        severity: "success",
        summary: "Успешно",
        detail: message,
        life: 3000,
      });
      clear();
      id.value = "";
      newpw.value = "";
    },
    on400: (error) => {
      errorMessage.value = error;
      toast.add({
        severity: "error",
        summary: "Ошибка",
        detail: error,
        life: 5000,
      });
    },
    on401: (error) => {
      errorMessage.value = error;
      toast.add({
        severity: "error",
        summary: "Ошибка аутентификации",
        detail: error,
        life: 5000,
      });
    },
    on404: (error) => {
      errorMessage.value = error;
      toast.add({
        severity: "error",
        summary: "Ошибка",
        detail: error,
        life: 5000,
      });
    },
    on500: (error) => {
      errorMessage.value = error;
      toast.add({
        severity: "error",
        summary: "Ошибка сервера",
        detail: error,
        life: 5000,
      });
    },
  });
};
</script>

<template>
  <Head>
    <Title>Сброс пароля / ЭФИР lab</Title>
  </Head>
  <section class="mx-6">
    <h1 class="font-head font-medium text-xl">Сброс пароля</h1>
    <p class="text-eph-gray-dark">
      Заполните необходимые поля, чтобы сбросить пароль пользователя LAB
    </p>
    <form id="reset" class="mt-2">
      <div class="flex flex-col lg:h-48">
        <div
          class="bg-eph-white border-1 border-solid border-zinc-200 rounded-2xl shadow-xl p-6 sm:p-4 lg:p-2 flex-auto flex flex-col sm:flex-row md:flex-col lg:flex-row justify-center items-center sm:gap-4 md:gap-0 lg:gap-4 font-medium"
        >
          <div class="sm:max-w-3/5 sm:order-last md:order-1 lg:order-last">
            <p class="font-light">
              <b>Пароль</b> должен состоять не менее, чем из 8 символов,
              содержать в себе минимум по одной строчной и прописной букве, одну
              цифру и один специальный знак.
            </p>
          </div>
          <div class="hidden lg:inline-flex h-full order-2">
            <Divider layout="vertical" />
          </div>
          <div
            class="flex flex-col gap-2 max-w-sm mx-auto mt-3 sm:order-1 md:order-last lg:order-1"
          >
            <FloatLabel variant="on">
              <InputText
                id="userid"
                v-model="id"
                type="text"
                autocomplete="off"
                fluid
                required
                @input="clear"
              />
              <label for="on_label">ID</label>
            </FloatLabel>
            <InputNewPassword
              :password="newpw"
              label="Новый пароль"
              @update:password="newpw = $event"
              @input="clear"
            />
          </div>
        </div>
      </div>
      <div
        class="flex flex-col sm:flex-row gap-4 pt-6 sm:justify-between sm:items-center"
      >
        <div class="flex gap-4">
          <ToogleSwitch v-model="sended" />
          <span>Я отправил новый пароль пользователю</span>
        </div>
        <Button
          type="submit"
          :disabled="!sended"
          ripple
          label="Обновить пароль"
          @click.prevent="
            if (validate()) {
              resetPasswordHandler();
            }
          "
        />
      </div>
      <p
        v-if="errorMessage"
        class="text-eph-red text-sm w-full pt-2 text-center"
      >
        {{ errorMessage }}
      </p>
    </form>
  </section>
  <Toast />
</template>