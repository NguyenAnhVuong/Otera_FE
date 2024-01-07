/* eslint-disable no-param-reassign */
import { validateJwtToken } from "@/utils/jwt";
import axios from "axios";
import { authApi } from "./authApi";

const axiosJWT = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosJWT.interceptors.request.use(
  async (config: any) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const validatedJwtToken = validateJwtToken(accessToken);
      if (!validatedJwtToken) {
        const { data } = await authApi.refreshToken();
        config.headers.authorization = `Bearer ${data.accessToken}`;
        localStorage.setItem("accessToken", data.accessToken);
      } else {
        config.headers.authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (err) => Promise.reject(err)
);

export default axiosJWT;
