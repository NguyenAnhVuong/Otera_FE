import useTrans from "@/hooks/useTrans";
import { BellOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";

type FollowButtonProps = {
  isFollowing?: boolean;
  handleFollow?: () => void;
  handleUnFollow?: () => void;
};

const FollowButton: React.FC<FollowButtonProps> = ({
  isFollowing,
  handleUnFollow,
  handleFollow,
}) => {
  const { localeText } = useTrans();

  const handleSubscription = () => {
    if (isFollowing) {
      handleUnFollow && handleUnFollow();
    } else {
      handleFollow && handleFollow();
    }
  };

  return (
    <Button
      className="flex items-center"
      type={isFollowing ? "primary" : "default"}
      onClick={handleSubscription}
    >
      <BellOutlined />
      {isFollowing ? (
        <span>{localeText.temple.following}</span>
      ) : (
        <span>{localeText.temple.follow}</span>
      )}
    </Button>
  );
};

export default FollowButton;
