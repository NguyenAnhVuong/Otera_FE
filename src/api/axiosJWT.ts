/* eslint-disable no-param-reassign */
import JWTManager, { validateJwtToken } from "@/utils/jwt";
import axios from "axios";
import { authApi } from "./authApi";
import { removeSession, saveSession } from "@/utils/helper";

const axiosJWT = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosJWT.interceptors.request.use(
  async (config: any) => {
    const accessToken = localStorage.getItem("accessToken");
    // const accessToken = JWTManager.getToken();
    if (accessToken) {
      const validatedJwtToken = validateJwtToken(accessToken);
      if (!validatedJwtToken) {
        const { data } = await authApi.refreshToken();
        if (data) {
          config.headers.authorization = `Bearer ${data.accessToken}`;
          saveSession(data.accessToken, data.refreshToken);
          JWTManager.setToken(data.accessToken);
        } else {
          removeSession();
        }
      } else {
        config.headers.authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (err) => Promise.reject(err)
);

export default axiosJWT;
