"use client";
import { templeApi } from "@/api/templeApi";
import { useGetTempleByIdQuery } from "@/graphql/generated/schema";
import { Carousel, Image as ImageAntd } from "antd";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

type Props = {
  params: { id: string };
};

const TempleDetail = ({ params }: Props) => {
  const [temple, setTemple] = useState<any>({});
  const [images, setImages] = useState<any>([]);
  // const [visible, setVisible] = useState(false);
  // const [currentImage, setCurrentImage] = useState(0);
  const ref: any = useRef();
  const goToSlide = (index: Number) => {
    ref.current.goTo(index);
  };
  const { data } = useGetTempleByIdQuery({
    variables: {
      id: Number(params.id),
    },
  });
  useEffect(() => {
    if (data?.getTempleById?.data) {
      const templeData = data?.getTempleById?.data;
      setTemple(templeData);
      setImages([
        templeData.avatar,
        ...(templeData.images
          ? templeData.images.map((image: any) => image.image)
          : []),
      ]);
    }
  }, [params.id, data]);
  return (
    <div className="lg:flex lg:justify-center lg:mt-10 lg:p-4">
      <div className="lg:w-[1200px] lg:grid lg:grid-cols-10">
        <div className="lg:col-span-6 lg:grid lg:grid-cols-6 lg:pt-4">
          <div className="hidden lg:col-span-1 lg:flex lg:flex-col lg:gap-2">
            {images.map((image: string, index: number) => {
              return (
                <div
                  className="lg:relative lg:pt-[56.25%] lg:w-full"
                  onClick={() => goToSlide(index)}
                  key={index}
                >
                  <Image
                    className="lg:absolute lg:rounded-lg lg:cursor-pointer lg:object-cover lg:h-full lg:w-full lg:top-0 lg:left-0 lg:right-0 lg:bottom-0"
                    src={image}
                    alt=""
                    key={index}
                    fill
                  />
                </div>
              );
            })}
          </div>
          <div className="lg:col-span-5 lg:px-2">
            <Carousel
              className="lg:rounded-lg lg:overflow-hidden"
              dots={false}
              autoplay={true}
              ref={ref}
            >
              {images.map((image: string, index: number) => {
                return (
                  <div className="max-h-[329.0625px]" key={index}>
                    <ImageAntd
                      className="lg:rounded-lg lg:overflow-hidden lg:object-cover"
                      // onClick={() => {
                      //   setCurrentImage(index);
                      //   setVisible(true);
                      // }}
                      src={image}
                      key={index}
                      width={"100%"}
                      alt={`temple-image${index}`}
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                );
              })}
            </Carousel>
          </div>
        </div>

        <div className="text-black lg:col-span-4 p-4 text-base font-medium lg:flex lg:flex-col lg:justify-between">
          <div>
            <h2 className="text-2xl font-bold uppercase">{temple?.name}</h2>
            <p>Địa chỉ: {temple?.address}</p>
            <p>Số điện thoại: {temple?.phone}</p>
            <p className="min-h-[128px]">{temple?.description}</p>
            <p className="mt-8">Website: {temple?.website}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TempleDetail;
