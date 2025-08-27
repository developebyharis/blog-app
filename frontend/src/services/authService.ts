import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export async function register(data: any) {
  return axios.post(`${API_URL}/auth/register`, data);
}

export async function login(data: any) {
  return axios.post(`${API_URL}/auth/login`, data);
}

export function setAuthHeader(token: any) {
  //  to do operation on api again and again without need of any authorization when set on login time
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
