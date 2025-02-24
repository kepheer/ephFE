export class ValidationService {
  private static loginPattern = /^[a-zA-Zа-яА-ЯёЁ0-9]+$/;
  private static passwordComplexity = new RegExp(
    "^(?=.*[a-zA-Zа-яА-Я])(?=.*[A-ZА-Я])(?=.*\\d)(?=.*[!@#%^&*_=+\\-\\/\\\\]).{8,}$"
  );

  public static validateLogin(login: string): {
    isValid: boolean;
    message?: string;
  } {
    if (!login) {
      return { isValid: false, message: "Логин обязателен" };
    }
    if (!this.loginPattern.test(login)) {
      return { isValid: false, message: "Логин содержит недопустимые символы" };
    }
    if (login.length < 3 || login.length > 30) {
      return {
        isValid: false,
        message: "Логин должен содержать от 3 до 30 символов",
      };
    }
    return { isValid: true };
  }

  public static validatePassword(password: string): {
    isValid: boolean;
    message?: string;
  } {
    if (!password) {
      return { isValid: false, message: "Пароль обязателен" };
    }
    if (!this.passwordComplexity.test(password)) {
      return {
        isValid: false,
        message:
          "Пароль должен содержать минимум 8 символов, включая заглавные буквы, строчные буквы, цифры и специальные символы",
      };
    }
    return { isValid: true };
  }
}
