import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000",
});

export const setAuthToken = (token: string | null) => {
  if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete api.defaults.headers.common["Authorization"];
};
