import axiosJWT from "./axiosJWT";

export const deceasedApi = {
  declareDeceased: async (data: FormData) => {
    try {
      const response = await axiosJWT.post("/deceased/create", data);
      return response.data;
    } catch (err) {}
    return false;
  },
};
