import { defineStore } from "pinia";
import { api } from "~/utils/axios.config";

interface Artist {
  id: string;
  name: string;
  surname: string;
  firstname: string;
  patronymic: string;
  contact: string;
}

interface ManagerInfoResponse {
  m_surname: string;
  m_firstname: string;
  m_patronymic: string;
}

interface ArtistInfoResponse {
  _id: string;
  a_name: string;
  a_surname: string;
  a_firstname: string;
  a_patronymic?: string;
  m_id?: string;
}

interface InfoState {
  name: string;
  surname: string;
  firstname: string;
  patronymic: string;
  artists: Artist[];
  manager_id: string;
}

export const useInfoStore = defineStore("info", {
  state: (): InfoState => ({
    name: "",
    surname: "",
    firstname: "",
    patronymic: "",
    artists: [],
    manager_id: "",
  }),
  getters: {
    getName(state): string {
      return state.name;
    },
    getFirstName(state): string {
      return state.firstname;
    },
  },
  actions: {
    /**
     * Загружает информацию об артисте по его ID.
     * @param {string} id - ID артиста.
     */
    async getArtistInfo(id: string): Promise<void> {
      this.clean();
      try {
        const response = await api.get<ArtistInfoResponse[]>(`/artist/${id}`, {
          params: {
            fields: "a_name,a_surname,a_firstname,a_patronymic,m_id",
          },
        });

        const artistData = response.data[0];

        this.name = artistData.a_name || "";
        this.surname = artistData.a_surname || "";
        this.firstname = artistData.a_firstname || "";
        this.patronymic = artistData.a_patronymic || "";
        this.manager_id = artistData.m_id || "";

        console.log("Данные успешно загружены:", {
          name: this.name,
          surname: this.surname,
          firstname: this.firstname,
          patronymic: this.patronymic,
          manager_id: this.manager_id,
        });
      } catch (error: any) {
        if (error.response) {
          if (error.response.status === 404) {
            console.error("Артист не найден");
          } else if (error.response.status === 500) {
            console.error("Ошибка сервера", error.response.data.message);
          }
        } else {
          console.error("Неизвестная ошибка", error.message);
        }
      }
    },
    
    /**
     * Загружает информацию о менеджере по его ID.
     * @param {string} id - ID менеджера.
     */
    async getManagerInfo(id: string): Promise<void> {
      this.clean();
      try {
        const response = await api.get<ManagerInfoResponse>(`/manager/${id}`, {
          params: {
            fields: "m_surname,m_firstname,m_patronymic",
          },
        });
        this.surname = response.data.m_surname || "";
        this.firstname = response.data.m_firstname || "";
        this.patronymic = response.data.m_patronymic || "";
      } catch (error: any) {
        if (error.response) {
          if (error.response.status === 404) {
            console.error("Менеджер не найден");
          } else if (error.response.status === 500) {
            console.error("Ошибка сервера", error.response.data.message);
          }
        } else {
          console.error("Неизвестная ошибка", error.message);
        }
      }
    },

    /**
     * Загружает список артистов, связанных с менеджером.
     * @param {string} id - ID менеджера.
     */
    async getManagerPool(id: string): Promise<void> {
      this.clean();
      try {
        const response = await api.get<{ [key: string]: any }[]>(
          `/manager/${id}/artists`
        );
        this.artists = response.data.map((artist) => ({
          id: artist.user_id,
          name: artist.a_name,
          surname: artist.a_surname,
          firstname: artist.a_firstname,
          patronymic: artist.a_patronymic,
          contact: artist.a_contact,
        }));
      } catch (error: any) {
        if (error.response) {
          if (error.response.status === 404) {
            console.error("У данного менеджера нет артистов");
          } else if (error.response.status === 500) {
            console.error("Ошибка сервера", error.response.data.message);
          }
        } else {
          console.error("Неизвестная ошибка", error.message);
        }
      }
    },

    /**
     * Очищает состояние хранилища.
     */
    clean(): void {
      this.name = "";
      this.surname = "";
      this.firstname = "";
      this.patronymic = "";
      this.artists = [];
      this.manager_id = "";
    },
  },
});
