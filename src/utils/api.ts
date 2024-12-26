import axios from 'axios';
// export const baseURL="https://text-sharing-backend.vercel.app"

export const baseURL="http://localhost:5001"

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json', // Set default content type
  },
});

export default api;