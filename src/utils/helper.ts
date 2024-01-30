import { EGender } from "@/graphql/generated/schema";

export const getGenderText = (gender?: EGender) => {
  switch (gender) {
    case EGender.Male:
      return "Nam";
    case EGender.Female:
      return "Nữ";
    default:
      return "Khác";
  }
};
