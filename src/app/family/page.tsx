"use client";
import FamilyMemberList from "@/components/Templates/FamilyMemberList";
import { useAppSelector } from "@/rtk/hook";
import { NextPage } from "next";

const Page: NextPage = () => {
  const { familyId } = useAppSelector((state) => state.auth);
  return <FamilyMemberList familyId={familyId} />;
};

export default Page;
