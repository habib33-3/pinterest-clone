import axios from "axios";

import { env } from "@/config/env.config";

export const apiPublic = axios.create({
  baseURL: env.VITE_BACKEND_API_URL,
  withCredentials: true,
});
