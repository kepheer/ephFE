<script setup lang="ts">
defineProps({
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
  role: {
    type: String as PropType<"artist" | "manager" | "root">,
    required: true,
  },
  errorMessage: {
    type: String,
    default: "",
  },
});

defineEmits(["on-input", "next-step", "prev-step"]);

const localArtisticName = defineModel<string>("artisticName", {
  required: true,
});
const localSurname = defineModel<string>("surname", { required: true });
const localFirstname = defineModel<string>("firstname", { required: true });
const localPatronymic = defineModel<string>("patronymic", { required: true });
const localContacts = defineModel<string>("contacts", { required: true });
</script>

<template>
  <div class="flex flex-col lg:h-48">
    <div
      class="bg-eph-white border-1 border-solid border-zinc-200 rounded-2xl p-6 sm:p-4 lg:p-2 flex-auto flex flex-col justify-center items-center gap-2 font-medium text-center"
    >
      <div class="flex justify-center items-center mb-2">
        <span class="font-light"
          >Заполните необходимую контактную информацию</span
        >
      </div>
      <form>
        <div
          class="flex flex-col lg:flex-row flex-wrap w-full gap-3 lg:gap-6 justify-center items-center mt-3"
        >
          <FloatLabel variant="on">
            <InputText
              id="surname"
              v-model="localSurname"
              type="text"
              autocomplete="off"
              required
              @input="$emit('on-input')"
            />
            <label for="on_label">Фамилия</label>
          </FloatLabel>
          <FloatLabel variant="on">
            <InputText
              id="firstname"
              v-model="localFirstname"
              type="text"
              autocomplete="off"
              required
              @input="$emit('on-input')"
            />
            <label for="on_label">Имя</label>
          </FloatLabel>
          <FloatLabel variant="on">
            <InputText
              id="patronymic"
              v-model="localPatronymic"
              type="text"
              autocomplete="off"
              @input="$emit('on-input')"
            />
            <label for="on_label">Отчество</label>
          </FloatLabel>
          <FloatLabel v-if="role === 'artist'" variant="on">
            <InputText
              id="a_name"
              v-model="localArtisticName"
              type="text"
              autocomplete="off"
              required
              @input="$emit('on-input')"
            />
            <label for="on_label">Творческий псевдоним</label>
          </FloatLabel>
          <FloatLabel variant="on">
            <InputText
              id="contacts"
              v-model="localContacts"
              type="text"
              autocomplete="off"
              required
              @input="$emit('on-input')"
            />
            <label for="on_label">Контакт</label>
          </FloatLabel>
        </div>
      </form>
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
