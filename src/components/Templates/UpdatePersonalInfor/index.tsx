"use client";
import Loading from "@/components/Atoms/Loading";
import AccountInfor from "@/components/Organisms/AccountInfor";
import UploadSingleImage from "@/components/Organisms/UploadSingleImage";
import { useGetUserQuery } from "@/graphql/generated/schema";
import useTrans from "@/hooks/useTrans";
import { KeyOutlined, UserOutlined } from "@ant-design/icons";
import type { GetProp, MenuProps } from "antd";
import { Menu } from "antd";
import React, { useState } from "react";
type MenuItem = GetProp<MenuProps, "items">[number];

type UpdatePersonalInforProps = {};

export enum EMenuKey {
  PERSONAL_INFORMATION = "PERSONAL_INFORMATION",
  CHANGE_PASSWORD = "CHANGE_PASSWORD",
}

const UpdatePersonalInfor: React.FC<UpdatePersonalInforProps> = ({}) => {
  const { data, loading } = useGetUserQuery();
  const { localeText } = useTrans();
  const [avatar, setAvatar] = useState<File | null>(null);
  const [menuKey, setMenuKey] = useState<EMenuKey>(
    EMenuKey.PERSONAL_INFORMATION
  );

  const items: MenuItem[] = [
    {
      key: EMenuKey.PERSONAL_INFORMATION,
      icon: <UserOutlined />,
      label: (
        <span className="text-black">
          {localeText.user.personalInformation}
        </span>
      ),
    },
    {
      key: EMenuKey.CHANGE_PASSWORD,
      icon: <KeyOutlined />,
      label: (
        <span className="text-black">{localeText.user.changePassword}</span>
      ),
    },
  ];

  return (
    <div className="flex justify-center items-center h-full">
      {loading && <Loading />}
      <div className="grid grid-cols-3 w-[680px] h-[398px] shadow-xl p-2">
        <div className="col-span-1">
          <div className="flex justify-center">
            <UploadSingleImage
              imageSrc={data?.getUser.data.userDetail.avatar}
              setUploadImage={setAvatar}
              isReadOnly={menuKey === EMenuKey.CHANGE_PASSWORD}
            />
          </div>

          <Menu
            className="mt-4"
            defaultSelectedKeys={[EMenuKey.PERSONAL_INFORMATION]}
            mode="vertical"
            items={items}
            onSelect={(item) => setMenuKey(item.key as EMenuKey)}
          />
        </div>
        <div className="col-span-2">
          {data && (
            <AccountInfor
              menuKey={menuKey}
              user={data.getUser.data}
              newAvatar={avatar}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdatePersonalInfor;
