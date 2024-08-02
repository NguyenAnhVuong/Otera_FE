"use client";
import NoData from "@/components/Atoms/NoData";
import PageTitleWithActions from "@/components/Atoms/PageTitleWithActions";
import SearchInput from "@/components/Atoms/SearchInput";
import DeceasedCard from "@/components/Organisms/DeceasedCard";
import {
  ERole,
  useFamilyGetListDeceasedQuery,
} from "@/graphql/generated/schema";
import useTrans from "@/hooks/useTrans";
import { useAppSelector } from "@/rtk/hook";
import { PAGE, TAKE } from "@/utils/constants";
import { Button, Pagination } from "antd";
import Link from "next/link";
import { useState } from "react";

const DeceasedList = () => {
  const { localeText } = useTrans();
  const [page, setPage] = useState(PAGE);
  const [totalItems, setTotalItems] = useState(0);
  const [keyword, setKeyword] = useState("");
  const { role } = useAppSelector((state) => state.auth);
  const { data } = useFamilyGetListDeceasedQuery({
    variables: { page, take: TAKE, keyword },
    onCompleted: (data) => {
      setTotalItems(data.familyGetListDeceased.data.totalItems);
    },
    fetchPolicy: "no-cache",
    notifyOnNetworkStatusChange: true,
  });
  return (
    <div className="bg-white flex flex-col items-center">
      <div className="w-[1200px]">
        <PageTitleWithActions title={localeText.deceased.deceasedList}>
          <div className="w-80 flex">
            <SearchInput
              setSearchKeyword={setKeyword}
              placeholder={localeText.searchByNameOrAddress}
            />
            {role === ERole.FamilyAdmin && (
              <Button type="primary" className="ml-2">
                <Link href="/deceased/declare">
                  {localeText.declareDeceased}
                </Link>
              </Button>
            )}
          </div>
        </PageTitleWithActions>
        {data && data.familyGetListDeceased.data.data.length ? (
          <div className="grid grid-cols-4 gap-5">
            {data.familyGetListDeceased.data.data.map((deceased) => {
              return (
                <div className="col-span-1" key={deceased.id}>
                  <DeceasedCard
                    id={deceased.id}
                    name={deceased.userDetail.name}
                    avatar={deceased.userDetail.avatar}
                    birthday={deceased.userDetail.birthday}
                    dateOfDeath={deceased.dateOfDeath}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="w-full content-center">
            <NoData />
          </div>
        )}
      </div>
      <Pagination
        className="mt-5"
        defaultCurrent={page}
        total={totalItems}
        onChange={(page) => setPage(page)}
        pageSize={TAKE}
      />
    </div>
  );
};

export default DeceasedList;
