<script setup lang="ts">
defineProps({
  password: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: "Пароль",
  },
});
defineEmits(["input"]);

const strongRegexp: RegExp = new RegExp(
  "^(?=.*[a-zA-Zа-яА-Я])(?=.*[A-ZА-Я])(?=.*\\d)(?=.*[!@#%^&*_=+\\-\\/\\\\]).{8,}$"
);

const localpw = defineModel<string>("password", { required: true });
</script>

<template>
  <FloatLabel variant="on" class="w-full">
    <Password
      id="pw"
      v-model="localpw"
      type="password"
      autocomplete="off"
      promptLabel="Начните вводить"
      weakLabel="Слишком простой"
      mediumLabel="Ещё немного"
      strongLabel="Отлично"
      :strongRegex="strongRegexp"
      required
      toggleMask
      @input="$emit('input')"
    />
    <label for="on_label">{{ label }}</label>
  </FloatLabel>
</template>
