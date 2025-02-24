<script setup lang="ts">
defineProps({
  login: {
    type: String,
    required: true,
  },
  pwmodel: {
    type: String,
    required: true,
  },
  errorMessage: {
    type: String,
    default: "",
  },
});

defineEmits(["next-step", "on-input"]);

const localLogin = defineModel<string>("login", { required: true });
const localPassword = defineModel<string>("pwmodel", { required: true });
</script>

<template>
  <div class="flex flex-col lg:h-48">
    <div
      class="bg-eph-white border-1 border-solid border-zinc-200 rounded-2xl shadow-xl p-6 sm:p-4 lg:p-2 flex-auto flex flex-col sm:flex-row md:flex-col lg:flex-row justify-center items-center sm:gap-4 md:gap-0 lg:gap-4 font-medium"
    >
      <div class="sm:max-w-3/5 sm:order-last md:order-1 lg:order-last">
        <p class="font-light">
          <b>Логин</b> должен содержать в себе от 3 до 30 символов, можно
          использовать кириллицу, латиницу и цифры. <br />
          <b>Пароль</b> должен состоять не менее, чем из 8 символов, содержать в
          себе минимум по одной строчной и прописной букве, одну цифру и один
          специальный знак.
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
            id="userlogin"
            v-model="localLogin"
            type="text"
            autocomplete="off"
            fluid
            required
            @input="$emit('on-input')"
          />
          <label for="on_label">Логин</label>
        </FloatLabel>
        <InputNewPassword
          :password="localPassword"
          label="Пароль"
          @update:password="localPassword = $event"
          @input="$emit('on-input')"
        />
      </div>
    </div>
  </div>
  <div class="flex pt-6 justify-between items-center gap-4">
    <span v-if="!errorMessage"></span>
    <p v-if="errorMessage" class="text-eph-red text-sm">
      {{ errorMessage }}
    </p>
    <Button ripple label="Далее" @click="$emit('next-step')" class="shrink-0" />
  </div>
</template>
