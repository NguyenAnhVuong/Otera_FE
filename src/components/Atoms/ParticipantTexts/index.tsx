import { ERole } from "@/graphql/generated/schema";
import { getParticipants } from "@/utils/helper";
import React from "react";

type GetParticipantTextProps = {
  eventParticipantTypes: {
    __typename?: "EventParticipantType" | undefined;
    role: ERole;
  }[];
  localeText: any;
};

const ParticipantTexts: React.FC<GetParticipantTextProps> = ({
  eventParticipantTypes,
  localeText,
}) => {
  const participants = getParticipants(eventParticipantTypes, localeText);

  return (
    <>
      {participants.map((participant, index) => (
        <span key={index}>
          {participant}
          {index < participants.length - 1 && ", "}
        </span>
      ))}
    </>
  );
};

export default ParticipantTexts;
