import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const api = axios.create({
  baseURL: baseURL,
});
export default api;
