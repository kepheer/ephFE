import { api } from "~/utils/axios.config";

export interface UserRegistrationData {
  login: string;
  password: string;
  role: "artist" | "manager" | "root";
}

export interface ArtistData {
  a_name: string;
  a_surname: string;
  a_firstname: string;
  a_patronymic?: string;
  a_contact: string;
}

export interface ManagerData {
  m_surname: string;
  m_firstname: string;
  m_patronymic?: string;
  m_contact: string;
}

interface ApiResponse<T> {
  message: string;
  data?: T;
}

export class RegistrationService {
  async registerUser(
    data: UserRegistrationData
  ): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await api.post("/auth/register", data);
      return response.data as ApiResponse<{ message: string }>;
    } catch (error: any) {
      throw new Error(`Ошибка при регистрации пользователя: ${error.message}`);
    }
  }

  async getUserIdByLogin(login: string): Promise<string> {
    try {
      const response = await api.get(`/auth/search/${login}`);
      return response.data.id as string;
    } catch (error: any) {
      throw new Error(`Ошибка при получении ID пользователя: ${error.message}`);
    }
  }

  async createArtist(
    id: string,
    artistData: ArtistData
  ): Promise<ApiResponse<{ message: string; artist: any }>> {
    try {
      const response = await api.post(`/artist/${id}`, artistData);
      return response.data as ApiResponse<{ message: string; artist: any }>;
    } catch (error: any) {
      throw new Error(
        `Ошибка при создании информации об артисте: ${error.message}`
      );
    }
  }

  async createManager(
    id: string,
    managerData: ManagerData
  ): Promise<ApiResponse<{ message: string; manager: any }>> {
    try {
      const response = await api.post(`/manager/${id}`, managerData);
      return response.data as ApiResponse<{ message: string; manager: any }>;
    } catch (error: any) {
      throw new Error(`Ошибка при создании менеджера: ${error.message}`);
    }
  }
}

export const registrationService = new RegistrationService();
