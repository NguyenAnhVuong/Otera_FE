"use client";

import FamilyListDeathAnniversary from "@/components/Templates/FamilyListDeathAnniversary";
import TempleListDeathAnniversary from "@/components/Templates/TempleListDeathAnniversary";
import { ERole } from "@/graphql/generated/schema";
import { useAppSelector } from "@/rtk/hook";

const Page = () => {
  const { role } = useAppSelector((state) => state.auth);
  if (role === ERole.FamilyAdmin || role === ERole.FamilyMember) {
    return <FamilyListDeathAnniversary />;
  }
  return <TempleListDeathAnniversary />;
};

export default Page;
