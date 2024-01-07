import axios from "axios";

export const authApi = {
  refreshToken: async () => {
    try {
      const res = await axios.post("/api/user/refresh-token", null, {
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
    return 0;
  },
};
