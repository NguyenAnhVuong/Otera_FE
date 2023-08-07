"use client";
import { templeApi } from "@/api/templeApi";
import { useAppSelector } from "@/rtk/hook";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {};

const Home = (props: Props) => {
  const search = useAppSelector((state) => state.search);
  const [temples, setTemples] = useState([]);

  useEffect(() => {
    const callApi = async () => {
      const res = await templeApi.getTemplesByKeyword(search.keyword);
      if (res) {
        setTemples(res.data);
      }
    };
    callApi();
  }, [search]);

  return (
    <div className="bg-white min-h-screen flex justify-center mt-4">
      <div className="grid grid-cols-3 h-fit gap-5">
        {temples &&
          temples.length > 0 &&
          temples.map((temple: any) => {
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
                    <img
                      className="h-[280px] object-cover"
                      alt={`temple-avatar-${temple.id}`}
                      src={temple.avatar}
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
