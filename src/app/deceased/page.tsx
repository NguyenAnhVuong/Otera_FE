"use client";
import { useGetListDeceasedQuery } from "@/graphql/generated/schema";
import { useAppSelector } from "@/rtk/hook";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import Image from "next/image";
import Link from "next/link";

type Props = {};

const Home = (props: Props) => {
  const auth = useAppSelector((state) => state.auth);
  const { data } = useGetListDeceasedQuery({
    variables: { familyId: auth.familyId as number },
  });
  const listDeceasedData = data?.getListDeceased?.data || [];
  return (
    <div className="bg-white flex flex-col items-center">
      <div>
        <h3 className="text-2xl">Danh sách thành viên an nghỉ</h3>
      </div>
      <div className="grid grid-cols-3 gap-5">
        {listDeceasedData.map((deceased) => {
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
    </div>
  );
};

export default Home;
