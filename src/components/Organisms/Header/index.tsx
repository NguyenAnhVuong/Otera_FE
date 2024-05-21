"use client";
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
        <span onClick={async () => await handleLogout(dispatch)}>
          Đăng xuất
        </span>
      ),
      key: "2",
    },
  ];

  const publicUserItems: MenuProps["items"] = useMemo(
    () => [
      {
        label: (
          <span onClick={() => router.push("/temple")}>
            {localeText.temple.temples}
          </span>
        ),
        key: "temple",
      },
      {
        label: (
          <span onClick={() => router.push("/family-register")}>
            Đăng ký gia đình
          </span>
        ),
        key: "family-register",
      },
      {
        label: (
          <span onClick={() => router.push("/temple-register")}>
            Đăng ký chùa
          </span>
        ),
        key: "temple-register",
      },
      {
        label: (
          <span onClick={() => router.push("/event")}>
            {localeText.event.events}
          </span>
        ),
        key: "event",
      },
      {
        label: (
          <span onClick={async () => router.push("/event/user")}>
            {localeText.event.bookingEvents}
          </span>
        ),
        key: "/event/user",
      },
      {
        label: (
          <span onClick={async () => await handleLogout(dispatch)}>
            Đăng xuất
          </span>
        ),
        key: "logout",
      },
    ],
    [dispatch, handleLogout, localeText, router]
  );

  const familyAdminItems: MenuProps["items"] = useMemo(
    () => [
      {
        label: (
          <span onClick={() => router.push("/temple")}>
            {localeText.temple.temples}
          </span>
        ),
        key: "temple",
      },
      {
        label: (
          <span onClick={() => router.push("/death-anniversary")}>
            Yêu cầu tổ chức lễ giỗ
          </span>
        ),
        key: "death-anniversary",
      },
      {
        label: (
          <span onClick={() => router.push("/event")}>
            {localeText.event.events}
          </span>
        ),
        key: "event",
      },
      {
        label: (
          <span onClick={async () => router.push("/event/user")}>
            {localeText.event.bookingEvents}
          </span>
        ),
        key: "event/user",
      },
      {
        label: (
          <span onClick={() => router.push("/deceased")}>
            {localeText.deceased.deceasedList}
          </span>
        ),
        key: "deceased",
      },
      {
        label: (
          <span onClick={() => router.push("/deceased/declare")}>
            {localeText.declareDeceased}
          </span>
        ),
        key: "deceased/declare",
      },
      {
        label: (
          <span onClick={() => router.push("/family")}>
            {localeText.family.members}
          </span>
        ),
        key: "family",
      },
      {
        label: (
          <span onClick={async () => await handleLogout(dispatch)}>
            Đăng xuất
          </span>
        ),
        key: "logout",
      },
    ],
    [dispatch, handleLogout, localeText, router]
  );

  const templeAdminItems: MenuProps["items"] = useMemo(
    () => [
      {
        label: (
          <span onClick={() => router.push("/temple")}>
            {localeText.temple.temples}
          </span>
        ),
        key: "temple",
      },
      {
        label: (
          <span onClick={() => router.push("/death-anniversary")}>
            Yêu cầu tổ chức lễ giỗ
          </span>
        ),
        key: "death-anniversary",
      },
      {
        label: (
          <span onClick={() => router.push("/event/organize")}>
            {localeText.event.organizeEvent}
          </span>
        ),
        key: "event/organize",
      },
      {
        label: (
          <span onClick={() => router.push("/event/temple")}>
            {localeText.event.eventManagements}
          </span>
        ),
        key: "event/temple",
      },
      {
        label: (
          <span onClick={() => router.push("/event")}>
            {localeText.event.events}
          </span>
        ),
        key: "event",
      },
      {
        label: (
          <span onClick={async () => await handleLogout(dispatch)}>
            Đăng xuất
          </span>
        ),
        key: "logout",
      },
    ],
    [dispatch, handleLogout, localeText, router]
  );

  switch (authUser.role) {
    case ERole.PUBLIC_USER:
      items = [...publicUserItems];
      break;
    case ERole.FAMILY_ADMIN:
      items = [...familyAdminItems];
      break;
    case ERole.TEMPLE_ADMIN:
      items = [...templeAdminItems];
      break;
  }

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
        <Link
          href="/temple"
          className="flex items-center no-underline text-black"
        >
          <Image
            src="/images/otera-logo.png"
            width={30}
            height={45}
            alt="otera-logo"
          />
          <span className="ml-2 text-xl font-semibold">Otera</span>
        </Link>

        <div className="flex items-center">
          <div className="ml-4 flex items-center ">
            {!authUser.id ? (
              <Link className="text-black no-underline" href="/login">
                Đăng nhập
              </Link>
            ) : (
              <div className="flex items-center">
                <Notifications />

                <Dropdown menu={{ items }} trigger={["click"]}>
                  <div className="flex items-center cursor-pointer">
                    <Image
                      src={authUser.avatar}
                      width={40}
                      height={40}
                      alt="avatar"
                      className="rounded-full"
                    />
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
