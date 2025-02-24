import { useUserStore } from "~/stores/user";
import { api } from "~/utils/axios.config";
import { useCookie } from "#app";

interface AuthResponseData {
  userId: string;
  login: string;
  role: string;
}

type CheckAuthOptions = {
  on200?: () => void;
  on401?: () => void;
  on403?: () => void;
  on500?: () => void;
};

export const checkAuth = async (options: CheckAuthOptions = {}) => {
  const userStore = useUserStore();

  if (userStore.isAuthenticated) {
    options.on200?.();
    return;
  }

  const token = useCookie("token");
  if (token.value) {
    const id = useCookie("userId").value;
    const login = useCookie("login").value;
    const role = useCookie("role").value;

    if (id && login && role) {
      userStore.login({ id, login, role });
      options.on200?.();
      return;
    }
  }

  try {
    const authResponse = await api.get<AuthResponseData>("/auth/");
    if (authResponse.status === 200) {
      const { userId } = authResponse.data;
      if (!userId) {
        console.error("Отсутствует ID пользователя в ответе сервера");
        return;
      }

      try {
        const userResponse = await api.get<AuthResponseData>(`/auth/${userId}`);
        if (userResponse.status === 200) {
          const { login, role } = userResponse.data;
          if (login && role) {
            userStore.login({
              id: userId,
              login,
              role,
            });
            const token = useCookie("token");
            token.value = authResponse.headers["authorization"];
            useCookie("userId").value = userId;
            useCookie("login").value = login;
            useCookie("role").value = role;
            options.on200?.();
          } else {
            console.error("Некорректные данные пользователя");
          }
        }
      } catch (error: any) {
        handleErrorResponse(error, options);
      }
    }
  } catch (error: any) {
    handleErrorResponse(error, options);
  }
};

const handleErrorResponse = (error: any, options: CheckAuthOptions) => {
  if (error.response) {
    const status = error.response.status;
    if (status === 401) {
      options.on401?.();
    } else if (status === 403) {
      options.on403?.();
    } else if (status === 500) {
      console.error(error.response.data.message || "Ошибка сервера");
      options.on500?.();
    } else {
      console.error("Ошибка сервера");
    }
  } else if (error.request) {
    console.error("Неизвестная ошибка: Нет ответа от сервера");
  } else {
    console.error("Ошибка сервера:", error.message);
  }
};
