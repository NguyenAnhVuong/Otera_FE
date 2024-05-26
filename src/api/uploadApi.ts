import axiosJWT from "./axiosJWT";

export const uploadApi = {
  uploadImage: async (image: FormData) => {
    try {
      const response = await axiosJWT.post("/cloudinary/upload", image);
      return response.data;
    } catch (err) {}
    return 0;
  },
  uploadImages: async (images: FormData) => {
    try {
      const response = await axiosJWT.post("/cloudinary/uploads", images);
      return response.data;
    } catch (err) {}
    return 0;
  },
};
