import axios from "axios";

export const authApi = {
  refreshToken: async () => {
    try {
      const res = await axios.post("/user/refresh-token", null, {
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        withCredentials: true,
      });
      return res.data;
    } catch (err) {}
    return 0;
  },
  removeRefreshToken: async () => {
    try {
      await axios.post("/user/remove-refresh-token", null, {
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        withCredentials: true,
      });
    } catch (err) {}
  },
};
