import { CreateFamily } from "@/models/family";
import axiosJWT from "./axiosJWT";

export const familyApi = {
  createFamily: async (family: FormData) => {
    try {
      const res = await axiosJWT.post("/family/create", family);
      return res.data;
    } catch (err) {}
    return false;
  },
};
