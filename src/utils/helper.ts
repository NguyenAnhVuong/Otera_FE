import { EGender, EStatus } from "@/graphql/generated/schema";

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

export const getStatusText = (status?: EStatus) => {
  switch (status) {
    case EStatus.Rejected:
      return "Từ chối";
    case EStatus.Approved:
      return "Chấp nhận";
    default:
      return "Đang chờ";
  }
};
