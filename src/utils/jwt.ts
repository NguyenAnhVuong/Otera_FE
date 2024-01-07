import dayjs from "dayjs";
import jwtDecode from "jwt-decode";
import { ERole } from "./enum";

export interface IJwtPayload {
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
