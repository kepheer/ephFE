import { checkAuth } from "~/services/checkAuth";
import { navigateTo } from "#app";
import { useUserStore } from "~/stores/user";

export default defineNuxtRouteMiddleware(async () => {
  try {
    await checkAuth({
      on200: () => {
        return;
      },
      on401: () => {
        console.warn("Необходима авторизация");
        return navigateTo("/", { redirectCode: 302 });
      },
      on403: () => {
        console.warn("Недействительный токен");
        return navigateTo("/", { redirectCode: 302 });
      },
      on500: () => {
        console.error("Внутренняя ошибка сервера");
        return navigateTo("/", { redirectCode: 302 });
      },
    });
  } catch (error: any) {
    console.error("Ошибка в middleware:", error.message);
    return navigateTo("/", { redirectCode: 302 });
  }
});
