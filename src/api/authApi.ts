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
};
