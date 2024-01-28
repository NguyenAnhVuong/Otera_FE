"use client";
import { useGetTemplesQuery } from "@/graphql/generated/schema";
import { useAppSelector } from "@/rtk/hook";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import Image from "next/image";
import Link from "next/link";

type Props = {};

const Home = (props: Props) => {
  const keyword = useAppSelector((state) => state.search.keyword);
  const { data } = useGetTemplesQuery({
    variables: { keyword },
  });
  const templesData = data?.getTemples?.data?.data || [];
  return (
    <div className="bg-white flex justify-center mt-header">
      <div className="grid grid-cols-3 gap-5">
        {templesData.map((temple: any) => {
          return (
            <Link
              className="no-underline h-[400px] shadow-lg rounded-lg"
              href={`/temple/${temple.id}`}
              key={temple.id}
            >
              <Card
                hoverable
                style={{ width: 300, height: 280 }}
                cover={
                  <Image
                    className="h-[280px] object-cover"
                    alt={`temple-avatar-${temple.id}`}
                    src={temple.avatar}
                    width={300}
                    height={280}
                  />
                }
              >
                <Meta title={temple.name} description={temple.address} />
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
