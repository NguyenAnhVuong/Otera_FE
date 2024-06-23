import ChangePasswordTab from "@/components/Molecules/ChangePasswordTab";
import PersonalInforTab from "@/components/Molecules/PersonalInforTab";
import { EMenuKey } from "@/components/Templates/UpdatePersonalInfor";
import { GetUserQuery } from "@/graphql/generated/schema";
import React from "react";

type AccountInforProps = {
  menuKey: EMenuKey;
  user: GetUserQuery["getUser"]["data"];
  newAvatar?: File | null;
};

const AccountInfor: React.FC<AccountInforProps> = ({
  menuKey,
  user,
  newAvatar,
}) => {
  switch (menuKey) {
    case EMenuKey.PERSONAL_INFORMATION:
      return <PersonalInforTab user={user} newAvatar={newAvatar} />;
    default:
      return <ChangePasswordTab />;
  }
};

export default AccountInfor;
