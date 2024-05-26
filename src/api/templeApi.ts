import axiosJWT from "./axiosJWT";

export const templeApi = {
  createTemple: async (temple: any) => {
    try {
      const res = await axiosJWT.post("/temple/create", temple, {
        baseURL: process.env.NEXT_PUBLIC_API_URL,
      });
      return res.data;
    } catch (err) {}
    return 0;
  },
  getTemplesByKeyword: async (keyword: string) => {
    try {
      const res = await axiosJWT.get(`/temple/all?keyword=${keyword}`, {
        baseURL: process.env.NEXT_PUBLIC_API_URL,
      });
      return res.data;
    } catch (err) {}
    return 0;
  },
  getTempleById: async (id: string) => {
    try {
      const res = await axiosJWT.get(`/temple/${id}`, {
        baseURL: process.env.NEXT_PUBLIC_API_URL,
      });
      return res.data;
    } catch (err) {}
    return 0;
  },
};
