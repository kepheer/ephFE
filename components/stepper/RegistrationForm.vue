<script setup lang="ts">
import { ref } from "vue";
import { registrationService } from "@/services/register";

const login = ref<string>("");
const pw = ref<string>("");
const role = ref<"artist" | "manager" | "root">("artist");
const artisticName = ref<string>("");
const surname = ref<string>("");
const firstname = ref<string>("");
const patronymic = ref<string>("");
const contacts = ref<string>("");
const errorMessage = ref<string>("");
const isRegistered = ref<boolean>(false);

interface RolesList {
  value: "artist" | "manager" | "root";
  label: string;
}

const rolesList: RolesList[] = [
  { value: "artist", label: "Артист" },
  { value: "manager", label: "Менеджер" },
  { value: "root", label: "Управляющий" },
];

const passwordComplexity = new RegExp(
  "^(?=.*[a-zA-Zа-яА-Я])(?=.*[A-ZА-Я])(?=.*\\d)(?=.*[!@#%^&*_=+\\-\\/\\\\]).{8,}$"
);
const loginPattern = /^[a-zA-Zа-яА-ЯёЁ0-9]+$/;

const validateLogin = (): boolean => {
  if (!login.value) {
    errorMessage.value = "Логин обязателен";
    return false;
  }
  if (!loginPattern.test(login.value)) {
    errorMessage.value = "Логин содержит недопустимые символы";
    return false;
  }
  if (login.value.length < 3 || login.value.length > 30) {
    errorMessage.value = "Логин должен содержать от 3 до 30 символов";
    return false;
  }
  return true;
};

const validatePassword = (): boolean => {
  if (!pw.value) {
    errorMessage.value = "Пароль обязателен";
    return false;
  }
  if (!passwordComplexity.test(pw.value)) {
    errorMessage.value =
      "Пароль должен содержать минимум 8 символов, включая заглавные буквы, строчные буквы, цифры и специальные символы";
    return false;
  }
  return true;
};

const validateStep1 = (): boolean => validateLogin() && validatePassword();
const validateStep2 = (): boolean => !!role.value;
const validateStep3 = (): boolean => {
  if (!surname.value || !firstname.value || !contacts.value || role.value === "artist" && !artisticName.value) {
    errorMessage.value = "Пожалуйста, заполните все обязательные поля";
    return false;
  }
  return true;
};

const onInput = (): void => {
  errorMessage.value = "";
};

const handleRegister = async () => {
  errorMessage.value = "";
  try {
    const registrationData = {
      login: login.value,
      password: pw.value,
      role: role.value,
    };
    await registrationService.registerUser(registrationData);
    const userId = await registrationService.getUserIdByLogin(login.value);
    if (role.value === "artist") {
      const artistData = {
        a_name: artisticName.value,
        a_surname: surname.value,
        a_firstname: firstname.value,
        a_patronymic: patronymic.value,
        a_contact: contacts.value,
      };
      await registrationService.createArtist(userId, artistData);
    } else if (role.value === "manager" || role.value === "root") {
      const managerData = {
        m_surname: surname.value,
        m_firstname: firstname.value,
        m_patronymic: patronymic.value,
        m_contact: contacts.value,
      };
      await registrationService.createManager(userId, managerData);
    }
    isRegistered.value = true;
  } catch (error: any) {
    errorMessage.value = error.message;
    console.error(error);
  }
};

const clear = (): void => {
  login.value = "";
  pw.value = "";
  role.value = "artist";
  artisticName.value = "";
  surname.value = "";
  firstname.value = "";
  patronymic.value = "";
  contacts.value = "";
  errorMessage.value = "";
  isRegistered.value = false;
};
</script>

<template>
  <Stepper value="1" linear>
    <StepList>
      <Step value="1"
        ><span class="hidden lg:block">Данные для входа</span></Step
      >
      <Step value="2"><span class="hidden lg:block">Роль</span></Step>
      <Step value="3"
        ><span class="hidden lg:block">Контактная информация</span></Step
      >
      <Step value="4"><span class="hidden lg:block">Подтверждение</span></Step>
    </StepList>
    <StepPanels>
      <StepPanel
        v-slot="{ activateCallback }"
        value="1"
        unstyled
        class="bg-zinc-50"
      >
        <StepperStepRegister1
          :login="login"
          :pwmodel="pw"
          :error-message="errorMessage"
          @update:login="login = $event"
          @update:pwmodel="pw = $event"
          @on-input="onInput"
          @next-step="
            if (validateStep1()) {
              activateCallback('2');
            }
          "
        />
      </StepPanel>

      <StepPanel
        v-slot="{ activateCallback }"
        value="2"
        unstyled
        class="bg-zinc-50"
      >
        <StepperStepRegister2
          :role="role"
          :roles-list="rolesList"
          :error-message="errorMessage"
          @update:role="role = $event"
          @next-step="
            if (validateStep2()) {
              activateCallback('3');
            }
          "
          @prev-step="activateCallback('1')"
        />
      </StepPanel>

      <StepPanel
        v-slot="{ activateCallback }"
        value="3"
        unstyled
        class="bg-zinc-50"
      >
        <StepperStepRegister3
          :artistic-name="artisticName"
          :surname="surname"
          :firstname="firstname"
          :patronymic="patronymic"
          :contacts="contacts"
          :role="role"
          :error-message="errorMessage"
          @on-input="onInput"
          @update:artistic-name="artisticName = $event"
          @update:surname="surname = $event"
          @update:firstname="firstname = $event"
          @update:patronymic="patronymic = $event"
          @update:contacts="contacts = $event"
          @next-step="
            if (validateStep3()) {
              activateCallback('4');
            }
          "
          @prev-step="activateCallback('2')"
        />
      </StepPanel>

      <StepPanel
        v-slot="{ activateCallback }"
        value="4"
        unstyled
        class="bg-zinc-50"
      >
        <StepperStepRegister4
          :login="login"
          :password="pw"
          :role="role"
          :artistic-name="artisticName"
          :surname="surname"
          :firstname="firstname"
          :patronymic="patronymic"
          :contacts="contacts"
          :is-registered="Boolean(isRegistered)"
          @prev-step="activateCallback('3')"
          @register="handleRegister"
          @clear="clear(), activateCallback('1')"
        />
      </StepPanel>
    </StepPanels>
  </Stepper>
</template>
