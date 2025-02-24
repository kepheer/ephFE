<script setup lang="ts">
defineProps({
  role: {
    type: String as PropType<"artist" | "manager" | "root">,
    required: true,
  },
  rolesList: {
    type: Array,
    required: true,
  },
  errorMessage: {
    type: String,
    default: "",
  },
});

defineEmits(["next-step", "prev-step"]);

const localRole = defineModel<"artist" | "manager" | "root">("role", {
  required: true,
});
</script>

<template>
  <div class="flex flex-col lg:h-48">
    <div
      class="bg-eph-white border-1 border-solid border-zinc-200 rounded-2xl shadow-xl py-4 px-2 sm:p-4 lg:p-2 flex-auto flex flex-col justify-center items-center gap-2 font-medium text-center"
    >
      <div class="flex justify-center items-center mb-2">
        <span class="font-light"
          >Выберите, кого вы хотите зарегистрировать</span
        >
      </div>
      <div class="hidden sm:block">
        <SelectButton
          v-model="localRole"
          :options="rolesList"
          optionLabel="label"
          optionValue="value"
          size="large"
        />
      </div>
      <div class="block sm:hidden">
        <SelectButton
          v-model="localRole"
          :options="rolesList"
          optionLabel="label"
          optionValue="value"
          size="small"
        />
      </div>
    </div>
  </div>
  <div class="flex pt-6 gap-4 justify-between text-center">
    <Button
      ripple
      label="Назад"
      severity="secondary"
      @click="$emit('prev-step')"
      class="shrink-0"
    />
    <p v-if="errorMessage" class="text-eph-red text-sm">{{ errorMessage }}</p>
    <Button ripple label="Далее" @click="$emit('next-step')" class="shrink-0" />
  </div>
</template>
