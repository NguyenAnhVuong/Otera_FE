import {
  EBookingStatus,
  EGender,
  ERole,
  ESortOrder,
  OrderBy,
} from "@/graphql/generated/schema";
import { SortOrder } from "antd/es/table/interface";

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

export const getParticipants = (
  eventParticipantTypes: {
    __typename?: "EventParticipantType" | undefined;
    role: ERole;
  }[],
  localeText: any
) => {
  const participants: string[] = [];
  eventParticipantTypes.forEach((eventParticipantType) => {
    switch (eventParticipantType.role) {
      case ERole.TempleAdmin:
      case ERole.TempleMember:
        if (!participants.includes(localeText.temple)) {
          participants.push(localeText.temple);
        }
        break;
      case ERole.FamilyAdmin:
      case ERole.FamilyMember:
        if (!participants.includes(localeText.family)) {
          participants.push(localeText.family);
        }
        break;
      case ERole.PublicUser:
        if (!participants.includes(localeText.publicUser)) {
          participants.push(localeText.publicUser);
        }
        break;
    }
  });
  return participants;
};

// convert order from antd to typeorm
export const convertOrder = (order?: SortOrder) => {
  return order === "ascend" ? ESortOrder.Asc : ESortOrder.Desc;
};

export const handleSortByColumn = (
  orderBy: OrderBy[],
  setOrderBy: (orderby: OrderBy[]) => void,
  column: string,
  sortOrder?: SortOrder
) => {
  const newSorter = [...orderBy].filter((item) => item.column !== column);
  if (!sortOrder) {
    setOrderBy(newSorter);
  } else {
    setOrderBy([
      ...newSorter,
      {
        column,
        sortOrder: convertOrder(sortOrder),
      },
    ]);
  }
  return 0;
};
