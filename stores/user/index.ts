import { defineStore } from "pinia";

interface UserState {
  isAuth: boolean;
  user_login: string;
  user_id: string;
  user_role: string;
}

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    isAuth: false,
    user_login: "",
    user_id: "",
    user_role: "",
  }),
  getters: {
    isAuthenticated(state): boolean {
      return state.isAuth;
    },
    getLogin(state): string {
      return state.user_login;
    },
    getRole(state): string {
      return state.user_role;
    },
    getUserId(state): string {
      return state.user_id;
    },
  },
  actions: {
    login(user: { id: string; login: string; role: string }): void {
      this.isAuth = true;
      this.user_id = user.id || "";
      this.user_login = user.login || "";
      this.user_role = user.role || "";
    },
    logout(): void {
      this.isAuth = false;
      this.user_login = "";
      this.user_id = "";
      this.user_role = "";
    },
    update(data: Partial<UserState>): void {
      if (data.user_login !== undefined) this.user_login = data.user_login;
      if (data.user_id !== undefined) this.user_id = data.user_id;
      if (data.user_role !== undefined) this.user_role = data.user_role;
    },
  },
});
