import { defineStore } from "pinia";
import { api } from "~/utils/axios.config";

interface User {
  id: string;
  login: string;
  role: string;
  createdAt: string;
}

interface UsersState {
  users: User[];
}

export const useUsersStore = defineStore("users", {
  state: () => ({
    users: [] as User[],
  }),
  getters: {
    getAllUsers(state): User[] {
      return state.users || [];
    },
  },
  actions: {
    /**
     * Загружает список всех пользователей с учетом фильтров.
     * @param {Object} params - Параметры запроса.
     * @param {string} [params.role] - Фильтр по роли пользователя.
     * @param {string} [params.sortOrder] - Порядок сортировки (asc или desc).
     * @param {string} [params.sortField] - Поле сортировки (login или createdAt).
     * @returns {Promise<User[]>} - Promise с массивом пользователей.
     */
    async fetchUsers(
      params: { role?: string; sortOrder?: string; sortField?: string } = {}
    ): Promise<User[]> {
      try {
        const response = await api.get<User[]>("/auth/users", {
          params: {
            role: params.role,
            sortOrder: params.sortOrder || "desc",
            sortField: params.sortField || "createdAt",
          },
        });

        this.users = response.data;
        return this.users;
      } catch (error: any) {
        if (error.response) {
          if (error.response.status === 401) {
            throw new Error("Необходимы права администратора.");
          } else if (error.response.status === 500) {
            throw new Error("Ошибка сервера.");
          }
        }
        throw new Error("Неизвестная ошибка при загрузке пользователей.");
      }
    },

    /**
     * Очищает список пользователей.
     */
    reset(): void {
      this.users = [];
    },
  },
});
