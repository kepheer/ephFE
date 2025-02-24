<script setup lang="ts">
import { ref } from "vue";
import ToogleSwitch from "primevue/toggleswitch";

defineProps({
  login: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String as PropType<"artist" | "manager" | "root">,
    required: true,
  },
  artisticName: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  patronymic: {
    type: String,
    required: true,
  },
  contacts: {
    type: String,
    required: true,
  },
  errorMessage: {
    type: String,
    default: "",
  },
  isRegistered: {
    type: Boolean,
    default: false,
  },
});

const sended = ref<boolean>(false);

defineEmits(["prev-step", "register", "clear"]);
</script>

<template>
  <div class="flex flex-col lg:h-48">
    <div
      class="bg-eph-white border-1 border-solid border-zinc-200 rounded-2xl shadow-xl p-6 sm:p-4 lg:p-2 flex-auto flex flex-col lg:flex-row justify-center items-center gap-2 font-medium text-center lg:text-left"
    >
      <div
        class="flex items-center justify-center w-full lg:w-2/5 order-last font-light"
      >
        <span v-if="!isRegistered"
          >Внимательно проверьте данные. Если ошиблись — вернитесь назад с
          помощью кнопки «Изменить».</span
        >
        <span v-if="isRegistered"
          >Отправьте новому пользователю данные для входа</span
        >
      </div>
      <div class="hidden lg:inline-flex h-full">
        <Divider layout="vertical" />
      </div>
      <div
        class="flex flex-col lg:flex-row items-center justify-center lg:gap-20 lg:w-3/5 order-first text-center lg:text-left"
      >
        <div class="flex flex-col">
          <span><strong>Логин:</strong> {{ login }}</span>
          <span><strong>Пароль:</strong> {{ password }}</span>
          <span><strong>Роль:</strong> {{ role }}</span>
        </div>
        <div class="flex flex-col">
          <span v-if="role === 'artist'">
            <strong>Творческий псевдоним:</strong> {{ artisticName }}
          </span>
          <span><strong>Фамилия:</strong> {{ surname }}</span>
          <span><strong>Имя:</strong> {{ firstname }}</span>
          <span><strong>Отчество:</strong> {{ patronymic }}</span>
          <span><strong>Контакт:</strong> {{ contacts }}</span>
        </div>
      </div>
    </div>
  </div>
  <div v-if="!isRegistered" class="flex justify-between pt-6">
    <Button
      ripple
      label="Изменить"
      severity="secondary"
      @click="$emit('prev-step')"
    />
    <Button ripple label="Зарегистрировать" @click="$emit('register')" />
  </div>
  <div
    v-if="isRegistered"
    class="flex flex-col sm:flex-row gap-4 pt-6 sm:justify-between sm:items-center"
  >
    <div class="flex gap-4">
      <ToogleSwitch v-model="sended" />
      <span>Я отправил данные для входа</span>
    </div>
    <Button
      :disabled="!sended"
      ripple
      label="Завершить"
      @click="$emit('clear')"
    />
  </div>
  <p v-if="errorMessage" class="text-eph-red text-sm w-full pt-2 text-center">
    {{ errorMessage }}
  </p>
</template>
