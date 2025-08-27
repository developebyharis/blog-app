import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

// Helper to get token from localStorage
function getAuthHeader() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getAllBlogs() {
  return axios.get(`${API_URL}/blog`);
}


export async function getBlogs() {
  return axios.get(`${API_URL}/blog/me`, {
    headers: getAuthHeader(), // send token
  });
}

export async function createBlog(data: any) {
  console.log("Data", data);
  return axios.post(`${API_URL}/blog`, data, {
    headers: getAuthHeader(), 
  });
}

export async function updateBlog(id: string, data: any) {
  return axios.patch(`${API_URL}/blog/${id}`, data, {
    headers: getAuthHeader(),
  });
}

export async function deleteBlog(id: string) {
  return axios.delete(`${API_URL}/blog/${id}`, {
    headers: getAuthHeader(),
  });
}
