import axios from "axios";

const api = axios.create({
  baseURL: `https://epheer.ru/api/`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
