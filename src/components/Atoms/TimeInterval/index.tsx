import { formatDate } from "@/utils/constants";
import dayjs from "dayjs";
import React from "react";

type TimeIntervalProps = {
  title: string;
  startTime: string;
  endTime: string;
  format: string;
};

const TimeInterval: React.FC<TimeIntervalProps> = ({
  title,
  startTime,
  endTime,
  format,
}) => {
  return (
    <div>
      <span className="w-20 inline-block">{title}: </span>
      <span>
        {dayjs(startTime).format(format)} - {dayjs(endTime).format(format)}
      </span>
    </div>
  );
};

export default TimeInterval;
