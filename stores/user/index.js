import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    isAuth: false,
    user_login: null,
    user_id: null,
    user_role: null,
  }),
  getters: {
    isAuthenticated: (state) => state.isAuth,
    getLogin: (state) => state.user_login,
    getRole: (state) => state.user_role,
    getUserId: (state) => state.user_id,
  },
  actions: {
    login(user) {
      this.isAuth = true;
      this.user_id = user.id || null;
      this.user_login = user.login || null;
      this.user_role = user.role || null;
    },

    logout() {
      this.isAuth = false;
      this.user_login = null;
      this.user_id = null;
      this.user_role = null;
    },

    update(data) {
      if (data.login) this.user_login = data.login;
      if (data.id) this.user_id = data.id;
      if (data.role) this.user_role = data.role;
    },
  },
});
