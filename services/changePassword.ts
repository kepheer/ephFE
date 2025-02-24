import { api } from "~/utils/axios.config";

interface ChangePasswordResponse {
  message: string;
}

type ChangePasswordOptions = {
  on200?: (message: string) => void;
  on400?: (error: string) => void;
  on401?: (error: string) => void;
  on404?: (error: string) => void;
  on500?: (error: string) => void;
};

export const changePassword = async (
  userId: string,
  newPassword: string,
  options: ChangePasswordOptions = {}
): Promise<void> => {
  try {
    const response = await api.put<ChangePasswordResponse>(
      `/auth/${userId}/password`,
      { newPassword }
    );

    if (response.status === 200) {
      options.on200?.(response.data.message);
    }
  } catch (error: any) {
    handleErrorResponse(error, options);
  }
};

const handleErrorResponse = (error: any, options: ChangePasswordOptions) => {
  if (error.response) {
    const status = error.response.status;
    const message = error.response.data.message || "Произошла ошибка";
    switch (status) {
      case 400:
        options.on400?.(message);
        break;
      case 401:
        options.on401?.(message);
        break;
      case 404:
        options.on404?.(message);
        break;
      case 500:
        options.on500?.(message);
        break;
      default:
        console.error("Неизвестная ошибка:", message);
    }
  } else if (error.request) {
    options.on500?.("Нет ответа от сервера");
  } else {
    options.on500?.(`Ошибка сервера: ${error.message}`);
  }
};
