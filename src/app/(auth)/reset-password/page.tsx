"use client";
import ResetPassword from "@/components/Templates/ResetPassword";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();

  return <ResetPassword token={searchParams.get("token") as string} />;
};

export default Page;
