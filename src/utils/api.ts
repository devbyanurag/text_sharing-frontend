import axios from "axios";
// export const baseURL="https://text-sharing-backend.vercel.app"

export const baseURL =
  import.meta.env.MODE == "development"
    ? "http://localhost:5001"
    : "https://text-sharing-backend.vercel.app";

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json", // Set default content type
  },
});

export default api;
