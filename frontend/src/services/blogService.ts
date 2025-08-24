import axios from "axios";

const API_URL = "http://localhost:4000/api/blog";

export const getBlogs = () => axios.get(API_URL);
export const createBlog = (data: any) => axios.post(API_URL, data);
export const updateBlog = (id: string, data: any) => axios.patch(`${API_URL}/${id}`, data);
export const deleteBlog = (id: string) => axios.delete(`${API_URL}/${id}`);
