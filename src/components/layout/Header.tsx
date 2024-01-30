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
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type Props = {};

const Header = ({}: Props) => {
  const authUser = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const handleLogout = useLogout();
  const [keyword, setKeyword] = useState("");
  const { data } = useGetUserQuery();
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
          <span onClick={() => router.push("/family-register")}>
            Đăng ký gia đình
          </span>
        ),
        key: "0",
      },
      {
        label: (
          <span onClick={() => router.push("/temple-register")}>
            Đăng ký chùa
          </span>
        ),
        key: "1",
      },
      {
        label: (
          <span onClick={async () => await handleLogout(dispatch)}>
            Đăng xuất
          </span>
        ),
        key: "2",
      },
    ],
    [dispatch, handleLogout, router]
  );

  const familyAdminItems: MenuProps["items"] = useMemo(
    () => [
      {
        label: (
          <span onClick={() => router.push("deceased")}>
            Thành viên an nghỉ
          </span>
        ),
        key: "0",
      },
      {
        label: (
          <span onClick={() => router.push("deceased/declare")}>Báo tử</span>
        ),
        key: "1",
      },
      {
        label: (
          <span onClick={async () => await handleLogout(dispatch)}>
            Đăng xuất
          </span>
        ),
        key: "2",
      },
    ],
    [dispatch, handleLogout, router]
  );

  switch (authUser.role) {
    case ERole.PUBLIC_USER:
      items = [...publicUserItems];
      break;
    case ERole.FAMILY_ADMIN:
      items = [...familyAdminItems];
      break;
  }

  useEffect(() => {
    const setKeywordState = setTimeout(() => {
      dispatch(searchActions.search(keyword));
    }, 500);

    return () => clearTimeout(setKeywordState);
  }, [dispatch, keyword]);

  useEffect(() => {
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
  }, [authUser.role, data, dispatch]);

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
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center">
          <ul className="flex list-none">
            <li className="px-2">
              <Link className="text-black no-underline" href="/home">
                Trang chủ
              </Link>
            </li>
          </ul>
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
