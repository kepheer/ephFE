<script setup lang="ts">
import { useUsersStore } from "~/stores/userlist";
import { ref, computed, onMounted } from "vue";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

definePageMeta({
  layout: "lab",
});

interface User {
  id: string;
  login: string;
  role: "root" | "manager" | "artist";
  createdAt: string;
}

const usersStore = useUsersStore();
const isLoading = ref<boolean>(false);
const errorMessage = ref<string | null>(null);
const roles: Array<User["role"]> = ["root", "manager", "artist"];

interface Filters {
  global: Filter;
  role: Filter;
}

const filters = ref<Filters>({
  global: { value: null, matchMode: "contains" },
  role: { value: null, matchMode: "equals" },
});

const hasUsers = computed(() => Boolean(usersStore.getAllUsers?.length));

const formatDate = (dateString: string | null): string => {
  if (
    !dateString ||
    dateString.trim() === "" ||
    isNaN(new Date(dateString).getTime())
  ) {
    return "Дата неизвестна";
  }
  return format(new Date(dateString), "d MMMM yyyy HH:mm:ss", {
    locale: ru,
  });
};

const loadUsers = async (): Promise<void> => {
  try {
    isLoading.value = true;
    errorMessage.value = null;

    if (!hasUsers.value) {
      await usersStore.fetchUsers({
        sortOrder: "desc",
        sortField: "createdAt",
      });
    }
  } catch (error: any) {
    errorMessage.value =
      error.message || "Произошла ошибка при загрузке данных.";
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  loadUsers();
});
</script>

<template>
  <Head>
    <Title>Все пользователи / ЭФИР lab</Title>
  </Head>
  <section class="mx-6">
    <h1 class="font-head font-medium text-xl mb-2">Все пользователи LAB</h1>
    <div
      class="bg-eph-white border-1 border-solid border-zinc-200 rounded-2xl shadow-xl p-6 sm:p-4 lg:p-2"
    >
      <div v-if="isLoading" class="flex justify-center">Загрузка...</div>
      <div v-else-if="errorMessage" class="text-center text-red-500">
        {{ errorMessage }}
      </div>

      <DataTable
        v-else-if="hasUsers"
        :value="usersStore.getAllUsers"
        stripedRows
        removableSort
        paginator
        highlightOnSelect
        v-model:filters="filters"
        :rows="10"
        :rowsPerPageOptions="[10, 20, 50]"
        responsiveLayout="scroll"
        :globalFilterFields="['id', 'login']"
      >
        <template #header>
          <div
            class="flex flex-col md:flex-row items-center justify-center gap-2 md:justify-between"
          >
            <InputText
              v-model="filters['global'].value"
              placeholder="Поиск по ID или логину"
              class="w-full md:w-[20rem]"
            />
            <Select
              v-model="filters['role'].value"
              :options="roles"
              showClear
              placeholder="Поиск по роли"
              class="w-full md:w-[14rem] md:ml-2"
            />
          </div>
        </template>

        <Column field="id" header="ID"></Column>
        <Column field="login" sortable header="Логин"></Column>
        <Column field="role" sortable header="Роль"></Column>
        <Column field="createdAt" sortable header="Дата регистрации">
          <template #body="slotProps">
            {{ formatDate((slotProps.data as User).createdAt) }}
          </template>
        </Column>
      </DataTable>
      <div v-else class="text-center text-gray-500">
        Нет данных о пользователях
      </div>
    </div>
  </section>
</template>
