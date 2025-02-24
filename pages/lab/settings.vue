<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "~/stores/user";
import { ValidationService } from "~/services/validator";
import { useToast } from "primevue/usetoast";
import { changePassword } from "~/services/changePassword";

definePageMeta({
  layout: "lab",
});

const newpw = ref<string>("");
const repeatpw = ref<string>("");
const errorMessage = ref<string>("");
const toast = useToast();
const userStore = useUserStore();

const validate = (): boolean => {
  if (!newpw.value || !repeatpw.value) {
    errorMessage.value = "Пароли не должны быть пустыми";
    return false;
  }
  if (newpw.value !== repeatpw.value) {
    errorMessage.value = "Пароли не совпадают";
    return false;
  }
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
  const id = userStore.getUserId;
  if (!id) {
    errorMessage.value = "Ошибка сервиса, попробуйте войти в аккаунт снова";
    return;
  }
  changePassword(id, newpw.value, {
    on200: (message) => {
      toast.add({
        severity: "success",
        summary: "Успешно",
        detail: message,
        life: 3000,
      });
      clear();
      newpw.value = "";
      repeatpw.value = "";
    },
    on400: (error) => {
      errorMessage.value = error;
    },
    on401: (error) => {
      errorMessage.value = error;
    },
    on404: (error) => {
      errorMessage.value = error;
    },
    on500: (error) => {
      errorMessage.value = error;
    },
  });
};
</script>

<template>
  <Head>
    <Title>Настройки / ЭФИР lab</Title>
  </Head>
  <section class="mx-6">
    <h1 class="font-head font-medium text-xl">Сменить пароль</h1>
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
            <InputNewPassword
              :password="newpw"
              label="Новый пароль"
              @update:password="newpw = $event"
              @input="clear"
            />
            <FloatLabel variant="on">
              <Password
                id="repeatpw"
                v-model="repeatpw"
                type="password"
                autocomplete="off"
                toggleMask
                :feedback="false"
                fluid
                required
                @input="clear"
              />
              <label for="on_label">Повторите пароль</label>
            </FloatLabel>
          </div>
        </div>
      </div>
      <div
        class="flex flex-col sm:flex-row gap-4 pt-6 sm:justify-between sm:items-center"
      >
        <p class="text-eph-red text-sm text-center">
          {{ errorMessage }}
        </p>
        <Button
          type="submit"
          ripple
          label="Обновить пароль"
          @click.prevent="
            if (validate()) {
              resetPasswordHandler();
            }
          "
          class="shrink-0"
        />
      </div>
    </form>
  </section>
  <Toast />
</template>
