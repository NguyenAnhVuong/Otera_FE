import { EGender, ERole } from "@/graphql/generated/schema";

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
