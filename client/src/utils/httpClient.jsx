import axios from "axios";

export const httpClient = axios.create({
  withCredentials: import.meta.env.DEV,
  baseURL: `http://localhost:5000/api/v1/`,
});