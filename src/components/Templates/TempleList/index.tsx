"use client";
import Loading from "@/components/Atoms/Loading";
import PageTitleWithActions from "@/components/Atoms/PageTitleWithActions";
import SearchInput from "@/components/Atoms/SearchInput";
import TempleCard from "@/components/Organisms/TempleCard";
import { useGetTemplesQuery } from "@/graphql/generated/schema";
import useTrans from "@/hooks/useTrans";
import { PAGE, TAKE } from "@/utils/constants";
import { Pagination } from "antd";
import { useState } from "react";

type TempListProps = {};

const TempList: React.FC<TempListProps> = ({}) => {
  const { localeText } = useTrans();
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(PAGE);
  const [totalItems, setTotalItems] = useState(0);
  const { data, loading } = useGetTemplesQuery({
    variables: { keyword, page, take: TAKE },
    onCompleted: (data) => {
      setTotalItems(data?.getTemples?.data?.totalItems ?? 0);
    },
  });
  const templesData = data?.getTemples?.data?.data ?? [];
  return (
    <div className="bg-white flex flex-col items-center mt-4">
      {loading && <Loading />}
      <div className="w-[1200px]">
        <PageTitleWithActions title={localeText.temple.list}>
          <div className="w-80">
            <SearchInput
              setSearchKeyword={setKeyword}
              placeholder={localeText.searchByNameOrAddress}
            />
          </div>
        </PageTitleWithActions>

        <div className="grid grid-cols-4 gap-5">
          {templesData &&
            !!templesData.length &&
            templesData.map((temple: any) => {
              return (
                <TempleCard
                  key={temple.id}
                  id={temple.id}
                  avatar={temple.avatar}
                  name={temple.name}
                  address={temple.address}
                />
              );
            })}
        </div>
      </div>
      <Pagination
        className="mt-4"
        current={page}
        total={totalItems}
        pageSize={TAKE}
        onChange={(page) => setPage(page)}
      />
    </div>
  );
};

export default TempList;
