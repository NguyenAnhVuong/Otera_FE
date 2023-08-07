"use client";
import { searchActions } from "@/features/search";
import { useLogout } from "@/hooks/useLogout";
import { useAppDispatch, useAppSelector } from "@/rtk/hook";
import { ERole } from "@/utils/enum";
import { SearchOutlined } from "@ant-design/icons";
import { Dropdown, Input, MenuProps } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {};

const Header = ({}: Props) => {
  const authUser = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const handleLogout = useLogout();
  const [keyWord, setKeyWord] = useState("");

  const items: MenuProps["items"] = [
    {
      label: <span onClick={() => handleLogout(dispatch)}>Đăng xuất</span>,
      key: "0",
    },
  ];

  useEffect(() => {
    const setKeyWordState = setTimeout(() => {
      dispatch(searchActions.search(keyWord));
    }, 500);

    return () => clearTimeout(setKeyWordState);
  }, [dispatch, keyWord]);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? (
    <div className="flex justify-center h-14 shadow-xl bg-white fixed top-0 left-0 right-0 items-center px-2 z-10">
      <div className="max-w-[1200px] w-full flex justify-between">
        <Link
          href="/home"
          className="flex items-center no-underline text-black"
        >
          <Image
            src="/otera-logo.png"
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
                  <span>{authUser.name}</span>
                </div>
              </Dropdown>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Header;
