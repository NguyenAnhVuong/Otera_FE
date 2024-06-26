"use client";
import HeaderMenu from "@/components/Molecules/HeaderMenu/index.tsx";
import Notifications from "@/components/Molecules/Notifications";
import { authActions } from "@/features/auth";
import { useGetUserLazyQuery } from "@/graphql/generated/schema";
import { useLogout } from "@/hooks/useLogout";
import useTrans from "@/hooks/useTrans";
import { User } from "@/models/auth";
import { useAppDispatch, useAppSelector } from "@/rtk/hook";
import { ERole } from "@/utils/enum";
import { Dropdown, MenuProps } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

const Header = () => {
  const authUser = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const handleLogout = useLogout();
  const [getUser] = useGetUserLazyQuery();

  const { localeText } = useTrans();
  const router = useRouter();
  let items: MenuProps["items"] = [
    {
      label: (
        <span className="block" onClick={() => router.push("/user/update")}>
          {localeText.user.update}
        </span>
      ),
      key: "/user/update",
    },
    {
      label: (
        <span
          className="block"
          onClick={async () => await handleLogout(dispatch)}
        >
          {localeText.logout}
        </span>
      ),
      key: "2",
    },
  ];

  useEffect(() => {
    const getUserData = async () => {
      const token = localStorage.getItem("accessToken");
      if (token && !authUser.id) {
        const { data } = await getUser();
        if (data) {
          const user = data.getUser.data;
          const userLogin: User = {
            id: user.id,
            name: user.userDetail.name,
            email: user.email,
            avatar: user.userDetail.avatar,
            role: user.role,
            familyId: user.familyId,
            templeIds: [
              ...(user.templeId ? [user.templeId] : []),
              ...(user.followerTemples.map((temple) => temple.templeId) || []),
            ],
          };
          dispatch(authActions.login(userLogin));
        }
      }
    };
    getUserData();
  }, [authUser, dispatch, getUser]);

  return (
    <div className="flex justify-center h-14 shadow-xl bg-white fixed top-0 left-0 right-0 items-center px-2 z-10">
      <div className="max-w-[1200px] w-full flex justify-between">
        <Link href="/" className="flex items-center no-underline text-black">
          <Image
            src="/images/otera-logo.png"
            width={30}
            height={45}
            alt="otera-logo"
          />
          <span className="ml-2 text-xl font-semibold">Otera</span>
        </Link>

        <HeaderMenu />

        <div className="flex items-center min-w-fit">
          <div className="ml-4 flex items-center">
            {!authUser.id ? (
              <Link className="text-black no-underline" href="/login">
                {localeText.login.title}
              </Link>
            ) : (
              <div className="flex items-center">
                <Notifications />

                <Dropdown menu={{ items }} trigger={["click"]}>
                  <div className="flex items-center cursor-pointer">
                    <div className="w-10 h-10 mx-2">
                      <Image
                        src={authUser.avatar}
                        fill
                        alt="avatar"
                        className="rounded-full object-cover static"
                      />
                    </div>
                    <span className="text-black"> {authUser.name}</span>
                  </div>
                </Dropdown>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
