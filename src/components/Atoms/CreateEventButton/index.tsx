import useTrans from "@/hooks/useTrans";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

const CreateEventButton = (props: Props) => {
  const { localeText } = useTrans();
  const router = useRouter();
  return (
    <Button type="primary" onClick={() => router.push("/event/organize")}>
      {localeText.event.organizeEvent}
    </Button>
  );
};

export default CreateEventButton;
