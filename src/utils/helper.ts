import {
  EGender,
  ERole,
  ESortOrder,
  OrderBy,
} from "@/graphql/generated/schema";
import { SortOrder } from "antd/es/table/interface";
import dayjs from "dayjs";
import { formatDate } from "./constants";

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
      case ERole.FamilyAdmin:
        participants.push(localeText.participantType.familyAdmin);

        break;
      case ERole.FamilyMember:
        participants.push(localeText.participantType.familyMember);

        break;
      case ERole.PublicUser:
        participants.push(localeText.participantType.publicUser);

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

export const formatTimeDifference = (date: Date) => {
  const now = dayjs();
  const inputDate = dayjs(date);
  const diffInMonths = now.diff(inputDate, "month");

  if (diffInMonths >= 1) {
    return inputDate.format("YYYY/MM/DD");
  } else {
    const diffInMinutes = now.diff(inputDate, "minute");
    const diffInHours = now.diff(inputDate, "hour");
    const diffInDays = now.diff(inputDate, "day");
    const diffInWeeks = now.diff(inputDate, "week");

    if (diffInMinutes < 60) {
      return `${diffInMinutes} phút trước`;
    } else if (diffInHours < 24) {
      return `${diffInHours} tiếng trước`;
    } else if (diffInDays < 7) {
      return `${diffInDays} ngày trước`;
    } else if (diffInWeeks < 4) {
      return `${diffInWeeks} tuần trước`;
    } else {
      return inputDate.format(formatDate.DD_MM_YYYY);
    }
  }
};
