import axiosJWT from "./axiosJWT";

export const templeApi = {
  createTemple: async (temple: any) => {
    try {
      const res = await axiosJWT.post(
        "http://localhost:3008/api/temple/create",
        temple
      );
      return res.data;
    } catch (err) {}
    return 0;
  },
  getTemplesByKeyword: async (keyword: string) => {
    try {
      const res = await axiosJWT.get(
        `http://localhost:3008/api/temple/all?keyword=${keyword}`
      );
      return res.data;
    } catch (err) {}
    return 0;
  },
  getTempleById: async (id: string) => {
    try {
      const res = await axiosJWT.get(`http://localhost:3008/api/temple/${id}`);
      return res.data;
    } catch (err) {}
    return 0;
  },
};
