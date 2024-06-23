"use client";
import PageTitle from "@/components/Atoms/PageTitle";
import PageTitleWithActions from "@/components/Atoms/PageTitleWithActions";
import SearchInput from "@/components/Atoms/SearchInput";
import DeceasedCard from "@/components/Organisms/DeceasedCard";
import { useFamilyGetListDeceasedQuery } from "@/graphql/generated/schema";
import useTrans from "@/hooks/useTrans";
import { PAGE, TAKE } from "@/utils/constants";
import { Card, Pagination } from "antd";
import Meta from "antd/es/card/Meta";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const DeceasedList = () => {
  const { localeText } = useTrans();
  const [page, setPage] = useState(PAGE);
  const [totalItems, setTotalItems] = useState(0);
  const [keyword, setKeyword] = useState("");
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
          <div className="w-80">
            <SearchInput
              setSearchKeyword={setKeyword}
              placeholder={localeText.searchByNameOrAddress}
            />
          </div>
        </PageTitleWithActions>
        <div className="grid grid-cols-4 gap-5">
          {data?.familyGetListDeceased.data.data.map((deceased) => {
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
