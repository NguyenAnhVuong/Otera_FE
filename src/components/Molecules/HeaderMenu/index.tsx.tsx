"use client";
import { ERole } from "@/graphql/generated/schema";
import useTrans from "@/hooks/useTrans";
import { useAppSelector } from "@/rtk/hook";
import { Menu, MenuProps } from "antd";
import Link from "next/link";
import { useState } from "react";

type HeaderMenuProps = {};

type MenuItem = Required<MenuProps>["items"][number];

const HeaderMenu: React.FC<HeaderMenuProps> = ({}) => {
  const authUser = useAppSelector((state) => state.auth);
  const [current, setCurrent] = useState("mail");
  const { localeText } = useTrans();
  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  const guestItems: MenuItem[] = [
    {
      label: <Link href="/">{localeText.header.home}</Link>,
      key: "/",
    },
    {
      label: (
        <Link className="text-black" href="/event" style={{ width: "164px" }}>
          {localeText.header.event}
        </Link>
      ),
      key: "/event",
    },
  ];

  const publicUserItems: MenuItem[] = [
    {
      label: <Link href="/">{localeText.header.home}</Link>,
      key: "/",
    },
    {
      label: (
        <Link className="text-black" href="/event" style={{ width: "164px" }}>
          {localeText.header.event}
        </Link>
      ),
      key: "/event",
      children: [
        {
          label: (
            <Link
              className="text-black"
              href="/event"
              style={{ width: "164px" }}
            >
              {localeText.header.listEvent}
            </Link>
          ),
          key: "/event",
        },
        {
          label: (
            <Link href="/event/user">{localeText.event.bookingEvents}</Link>
          ),
          key: "/event/user",
        },
      ],
    },
    {
      label: (
        <Link href="/family/register">{localeText.header.familyRegister}</Link>
      ),
      key: "/family/register",
    },
    {
      label: (
        <Link href="/temple/register">{localeText.header.templeRegister}</Link>
      ),
      key: "/temple/register",
    },
  ];

  const familyMemberItems: MenuItem[] = [
    {
      label: <Link href="/">{localeText.header.home}</Link>,
      key: "/",
    },
    {
      label: (
        <Link className="text-black" href="/event" style={{ width: "164px" }}>
          {localeText.header.event}
        </Link>
      ),
      key: "/event",
      children: [
        {
          label: (
            <Link
              className="text-black"
              href="/event"
              style={{ width: "164px" }}
            >
              {localeText.header.listEvent}
            </Link>
          ),
          key: "/event",
        },
        {
          label: (
            <Link href="/event/user">{localeText.event.bookingEvents}</Link>
          ),
          key: "/event/user",
        },
      ],
    },
    {
      label: (
        <Link className="text-black" href="/deceased">
          {localeText.header.family}
        </Link>
      ),
      key: "/deceased",
      children: [
        {
          label: (
            <Link className="text-black" href="/death-anniversary">
              {localeText.header.listDeathAnniversary}
            </Link>
          ),
          key: "/death-anniversary",
        },
        {
          label: (
            <Link className="text-black" href="/deceased">
              {localeText.header.listDeceased}
            </Link>
          ),
          key: "/deceased",
        },
      ],
    },
  ];

  const familyAdminItems: MenuItem[] = [
    {
      label: <Link href="/">{localeText.header.home}</Link>,
      key: "/",
    },
    {
      label: (
        <Link className="text-black" href="/event" style={{ width: "164px" }}>
          {localeText.header.event}
        </Link>
      ),
      key: "/event",
      children: [
        {
          label: (
            <Link
              className="text-black"
              href="/event"
              style={{ width: "164px" }}
            >
              {localeText.header.listEvent}
            </Link>
          ),
          key: "/event",
        },
        {
          label: (
            <Link href="/event/user">{localeText.event.bookingEvents}</Link>
          ),
          key: "/event/user",
        },
      ],
    },
    {
      label: (
        <Link className="text-black" href="/deceased">
          {localeText.header.family}
        </Link>
      ),
      key: "/deceased",
      children: [
        {
          label: (
            <Link className="text-black" href="/death-anniversary">
              {localeText.header.listDeathAnniversary}
            </Link>
          ),
          key: "/death-anniversary",
        },
        {
          label: (
            <Link className="text-black" href="/family">
              {localeText.header.listFamilyMember}
            </Link>
          ),
          key: "/family",
        },
        {
          label: (
            <Link className="text-black" href="/deceased">
              {localeText.header.listDeceased}
            </Link>
          ),
          key: "/deceased",
        },
      ],
    },
  ];

  const templeMemberItems: MenuItem[] = [
    {
      label: <span>{localeText.header.temple}</span>,
      key: "/temple",
      children: [
        {
          label: (
            <Link href="/death-anniversary">
              {localeText.header.listDeathAnniversary}
            </Link>
          ),
          key: "/death-anniversary",
        },
        {
          label: (
            <Link href="/temple/deceased">{localeText.header.listGraves}</Link>
          ),
          key: "/temple/deceased",
        },
      ],
    },
    {
      label: (
        <Link className="text-black" href="/event/temple">
          {localeText.header.event}
        </Link>
      ),
      key: "/event/temple",
      children: [
        {
          label: (
            <Link href="/event/temple">
              {localeText.header.eventManagement}
            </Link>
          ),
          key: "/event/temple",
        },
        {
          label: (
            <Link href="/temple/followers">
              {localeText.header.listFollower}
            </Link>
          ),
          key: "/temple/followers",
        },
      ],
    },
  ];

  const templeAdminItems: MenuItem[] = [
    {
      label: <span>{localeText.header.temple}</span>,
      key: "/temple",
      children: [
        {
          label: (
            <Link href="/death-anniversary">
              {localeText.header.listDeathAnniversary}
            </Link>
          ),
          key: "/death-anniversary",
        },
        {
          label: (
            <Link href="/temple/members">{localeText.header.listMonk}</Link>
          ),
          key: "/temple/members",
        },
        {
          label: (
            <Link href={`/temple/${authUser.templeIds[0]}/update`}>
              {localeText.temple.updateTemple.title}
            </Link>
          ),
          key: `/temple/${authUser.templeIds[0]}/update`,
        },
        {
          label: (
            <Link href="/temple/deceased">{localeText.header.listGraves}</Link>
          ),
          key: "/temple/deceased",
        },
      ],
    },
    {
      label: (
        <Link className="text-black" href="/event/temple">
          {localeText.header.event}
        </Link>
      ),
      key: "/event/temple",
      children: [
        {
          label: (
            <Link href="/event/temple">
              {localeText.header.eventManagement}
            </Link>
          ),
          key: "/event/temple",
        },
        {
          label: (
            <Link href="/temple/followers">
              {localeText.header.listFollower}
            </Link>
          ),
          key: "/temple/followers",
        },
      ],
    },
  ];

  const systemItems: MenuItem[] = [
    {
      label: (
        <Link href="/system/temple">{localeText.header.templeManagement}</Link>
      ),
      key: "system/temple",
    },
  ];

  const getMenuItems = () => {
    switch (authUser.role) {
      case ERole.PublicUser:
        return publicUserItems;
      case ERole.FamilyMember:
        return familyMemberItems;
      case ERole.FamilyAdmin:
        return familyAdminItems;
      case ERole.TempleMember:
        return templeMemberItems;
      case ERole.TempleAdmin:
        return templeAdminItems;
      case ERole.System:
        return systemItems;
      default:
        return guestItems;
    }
  };

  return (
    <Menu
      className="min-w-[480px] flex justify-center"
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={getMenuItems()}
      style={{ borderBottom: "none" }}
      triggerSubMenuAction="hover"
    />
  );
};

export default HeaderMenu;
