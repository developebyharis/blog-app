import { jwtDecode } from "jwt-decode";
import { reactive } from "vue";

export const authState = reactive({
  // it work as state in the utils and use reactive to store objects/array
  isAuthenticated: !!localStorage.getItem("token"),
  user: null,
  showAuthOverlay: false,
});

export function getUserFromToken() {
  //decoded the token and get all data from the token
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
}

export function isAuthenticated() {
  // return bollean weather the app is authenticated or not
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    if (!decoded) return "plase login";
    const currentTime = Date.now() / 1000;
    return decoded?.exp > currentTime;
  } catch {
    return false;
  }
}
