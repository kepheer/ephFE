<script setup lang="ts">
definePageMeta({
  layout: "lab",
});
</script>

<template>
  <Head>
    <Title>Регистрация / ЭФИР lab</Title>
  </Head>
  <section class="mx-6">
    <h1 class="font-head font-medium text-xl">Регистрация пользователя LAB</h1>
    <p class="text-eph-gray-dark">
      Заполните необходимые поля, чтобы зарегистрировать нового пользователя
    </p>
    <StepperRegistrationForm />
  </section>
</template>
