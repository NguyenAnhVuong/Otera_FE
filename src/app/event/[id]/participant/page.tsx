import EventParticipantList from "@/components/Templates/EventParticipantList";
import React from "react";

type EventParticipantsProps = {
  params: { id: string };
};

const EventParticipants: React.FC<EventParticipantsProps> = ({ params }) => {
  return <EventParticipantList eventId={Number(params.id)} />;
};

export default EventParticipants;
