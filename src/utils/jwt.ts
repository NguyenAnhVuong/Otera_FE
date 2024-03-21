import dayjs from "dayjs";
import jwtDecode from "jwt-decode";
import { ERole } from "./enum";
import { authApi } from "@/api/authApi";

export interface IJwtPayload {
  id: number;
  email: string;
  avatar: string;
  name: string;
  role: ERole;
  iat: number;
  exp: number;
}

export const validateJwtToken = (token: string | null) => {
  if (!token) {
    return false;
  }
  try {
    const tokenData = jwtDecode<IJwtPayload>(token);
    if (tokenData && dayjs(tokenData.exp * 1000).isAfter(Date.now())) {
      return tokenData;
    }
    return false;
  } catch (error) {
    return false;
  }
};
const JWTManager = () => {
  const LOGOUT_EVENT_NAME = "jwt-logout";

  let inMemoryToken: string | null = null;
  let refreshTokenTimeoutId: NodeJS.Timeout | null = null;

  const getToken = () => inMemoryToken;

  const setToken = (accessToken: string) => {
    inMemoryToken = accessToken;

    // Decode and set countdown to refresh
    const decoded = jwtDecode<IJwtPayload>(accessToken);
    setRefreshTokenTimeout((decoded.exp as number) - (decoded.iat as number));
    return true;
  };

  const abortRefreshToken = () => {
    if (refreshTokenTimeoutId) clearTimeout(refreshTokenTimeoutId);
  };

  const deleteToken = () => {
    inMemoryToken = null;
    abortRefreshToken();
    // localStorage.setItem(LOGOUT_EVENT_NAME, Date.now().toString());
    return true;
  };

  // To logout all tabs (nullify inMemoryToken)
  // window.addEventListener("storage", (event) => {
  //   if (event.key === LOGOUT_EVENT_NAME) inMemoryToken = null;
  // });

  const getRefreshToken = async () => {
    try {
      const { data } = await authApi.refreshToken();
      setToken(data.accessToken);
      return true;
    } catch (error) {
      console.log("UNAUTHENTICATED", error);
      deleteToken();
      return false;
    }
  };

  const setRefreshTokenTimeout = (delay: number) => {
    // 5s before token expires
    refreshTokenTimeoutId = setTimeout(getRefreshToken, delay * 1000 - 5000);
  };

  return {
    getToken,
    setToken,
    getRefreshToken,
    deleteToken,
  };
};

export default JWTManager();
