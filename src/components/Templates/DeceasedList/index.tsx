"use client";
import PageTitle from "@/components/Atoms/PageTitle";
import { useFamilyGetListDeceasedQuery } from "@/graphql/generated/schema";
import useTrans from "@/hooks/useTrans";
import { PAGE, TAKE } from "@/utils/constants";
import { Card, Pagination } from "antd";
import Meta from "antd/es/card/Meta";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// TODO Pagination
const DeceasedList = () => {
  const { localeText } = useTrans();
  const [page, setPage] = useState(PAGE);
  const [totalItems, setTotalItems] = useState(0);
  const { data } = useFamilyGetListDeceasedQuery({
    variables: { page, take: TAKE },
    onCompleted: (data) => {
      setTotalItems(data.familyGetListDeceased.data.totalItems);
    },
    fetchPolicy: "no-cache",
    notifyOnNetworkStatusChange: true,
  });
  return (
    <div className="bg-white flex flex-col items-center">
      <PageTitle title={localeText.deceased.deceasedList} />
      <div className="grid grid-cols-3 gap-5">
        {data?.familyGetListDeceased.data.data.map((deceased) => {
          return (
            <Link
              className="no-underline h-[400px] shadow-lg rounded-lg"
              href={`/deceased/${deceased.id}`}
              key={deceased.id}
            >
              <Card
                hoverable
                style={{ width: 300, height: 280 }}
                cover={
                  <Image
                    className="h-[280px] object-cover"
                    alt={`deceased-avatar-${deceased.id}`}
                    src={deceased.userDetail.avatar}
                    width={300}
                    height={280}
                  />
                }
              >
                <Meta
                  title={deceased.userDetail.name}
                  description={
                    deceased.userDetail.birthday + "-" + deceased.dateOfDeath
                  }
                />
              </Card>
            </Link>
          );
        })}
      </div>
      <Pagination
        className="mt-3"
        defaultCurrent={page}
        total={totalItems}
        onChange={(page) => setPage(page)}
        pageSize={TAKE}
      />
    </div>
  );
};

export default DeceasedList;
