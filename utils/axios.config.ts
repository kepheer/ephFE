import axios from "axios";

const api = axios.create({
  baseURL: "https://api.epheer.ru/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export { api };
