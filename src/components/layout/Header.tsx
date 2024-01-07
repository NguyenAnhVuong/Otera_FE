"use client";
import { authActions } from "@/features/auth";
import { searchActions } from "@/features/search";
import { useGetUserQuery } from "@/graphql/generated/schema";
import { useLogout } from "@/hooks/useLogout";
import { User } from "@/models/auth";
import { useAppDispatch, useAppSelector } from "@/rtk/hook";
import { ERole } from "@/utils/enum";
import { SearchOutlined } from "@ant-design/icons";
import { Dropdown, Input, MenuProps } from "antd";
import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useState } from "react";

type Props = {};

const Header = ({}: Props) => {
  const authUser = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const handleLogout = useLogout();
  const [keyWord, setKeyWord] = useState("");
  const { data } = useGetUserQuery();

  const items: MenuProps["items"] = [
    {
      label: (
        <span onClick={async () => await handleLogout(dispatch)}>
          Đăng xuất
        </span>
      ),
      key: "0",
    },
  ];

  useEffect(() => {
    const setKeyWordState = setTimeout(() => {
      dispatch(searchActions.search(keyWord));
    }, 500);

    return () => clearTimeout(setKeyWordState);
  }, [dispatch, keyWord]);

  useEffect(() => {
    if (data) {
      const user = data.getUser.data;
      const userLogin: User = {
        id: user.id,
        name: user.userDetail.name,
        email: user.email,
        avatar: user.userDetail.avatar,
        role: user.role,
      };
      dispatch(authActions.login(userLogin));
    }
  }, [data, dispatch]);

  return (
    <div className="flex justify-center h-14 shadow-xl bg-white fixed top-0 left-0 right-0 items-center px-2 z-10">
      <div className="max-w-[1200px] w-full flex justify-between">
        <Link
          href="/home"
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
          <div>
            <Input
              className="w-96"
              placeholder="Tìm kiếm"
              prefix={<SearchOutlined />}
              onChange={(e) => setKeyWord(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center">
          {authUser.role === ERole.PUBLIC_USER && (
            <ul className="flex list-none">
              <li className="px-2">
                <Link className="text-black no-underline" href="/home">
                  Trang chủ
                </Link>
              </li>
              <li className="px-2">
                <Link
                  className="text-black no-underline"
                  href="/temple-register"
                >
                  Đăng ký chùa
                </Link>
              </li>
              <li className="px-2">
                <Link className="text-black no-underline" href="/home">
                  Đăng ký gia đình
                </Link>
              </li>
            </ul>
          )}
          <div className="ml-4 flex items-center ">
            {authUser.id === -1 ? (
              <Link className="text-black no-underline" href="/login">
                Đăng nhập
              </Link>
            ) : (
              <Dropdown menu={{ items }} trigger={["click"]}>
                <div className="flex items-center cursor-pointer">
                  <Image
                    src={authUser.avatar}
                    width={40}
                    height={40}
                    alt="avatar"
                    className="rounded-full"
                  />
                  <span className="text-black">{authUser.name}</span>
                </div>
              </Dropdown>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
