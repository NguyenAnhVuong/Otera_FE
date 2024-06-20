import useTrans from "@/hooks/useTrans";
import { PlayCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import Link from "next/link";
import React from "react";

type WatchLiveStreamButtonProps = {
  linkLiveStream: string;
};

const WatchLiveStreamButton: React.FC<WatchLiveStreamButtonProps> = ({
  linkLiveStream,
}) => {
  const { localeText } = useTrans();
  return (
    <Tooltip title={localeText.deathAnniversary.watchLiveStream}>
      <Link href={linkLiveStream} target="_blank">
        <PlayCircleOutlined className="text-base text-primary cursor-pointer">
          {localeText.deathAnniversary.watchLiveStream}
        </PlayCircleOutlined>
      </Link>
    </Tooltip>
  );
};

export default WatchLiveStreamButton;
