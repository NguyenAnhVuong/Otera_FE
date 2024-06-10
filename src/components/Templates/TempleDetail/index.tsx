"use client";
import FollowButton from "@/components/Atoms/FollowButton";
import {
  ERole,
  GetTempleDetailDocument,
  useFollowTempleMutation,
  useGetTempleDetailQuery,
  useUnfollowTempleMutation,
} from "@/graphql/generated/schema";
import useTrans from "@/hooks/useTrans";
import { useAppSelector } from "@/rtk/hook";
import { Carousel, Image as ImageAntd } from "antd";
import Image from "next/image";
import { useRef, useState } from "react";

type TempleDetailProps = {
  templeId: number;
};
const TempleDetail: React.FC<TempleDetailProps> = ({ templeId }) => {
  const { localeText } = useTrans();
  const { messageApi } = useAppSelector((state) => state.antd);
  const { id, role } = useAppSelector((state) => state.auth);
  const [images, setImages] = useState<string[]>([]);
  const ref: any = useRef();
  const goToSlide = (index: number) => {
    ref.current.goTo(index);
  };
  const { data } = useGetTempleDetailQuery({
    variables: {
      id: templeId,
    },
    onCompleted: (data) => {
      if (data?.getTempleDetail?.data) {
        const templeData = data?.getTempleDetail?.data;

        setImages([
          templeData.avatar,
          ...(templeData.images
            ? templeData.images.map((image) => image.image)
            : []),
        ]);
      }
    },
    skip: !templeId,
  });

  const [follow] = useFollowTempleMutation({
    variables: {
      followTempleInput: {
        templeId: templeId,
      },
    },
    onCompleted: (data) => {
      if (!data.followTemple.errorCode) {
        messageApi.success(localeText.temple.followSuccessMessage);
      }
    },
    onError: () => {
      messageApi.error(localeText.temple.followFailMessage);
    },
    refetchQueries: [GetTempleDetailDocument],
  });

  const [unFollow] = useUnfollowTempleMutation({
    variables: {
      templeId: templeId,
    },
    onCompleted: (data) => {
      if (!data.unfollowTemple.errorCode) {
        messageApi.success(localeText.temple.unfollowSuccessMessage);
      }
    },
    onError: () => {
      messageApi.error(localeText.temple.unfollowFailMessage);
    },
    refetchQueries: [GetTempleDetailDocument],
  });

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
                      className="lg:rounded-lg lg:overflow-hidden lg:object-cover max-h-[329.0625px]"
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
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold uppercase">
                {data?.getTempleDetail?.data?.name}
              </h2>
              {id && role !== ERole.System && (
                <FollowButton
                  isFollowing={
                    !!data?.getTempleDetail?.data.followerTemples.length
                  }
                  handleFollow={follow}
                  handleUnFollow={unFollow}
                />
              )}
            </div>
            <p>
              {localeText.temple.address}:{" "}
              {data?.getTempleDetail?.data?.address}
            </p>
            <p>
              {localeText.temple.phone}: {data?.getTempleDetail?.data?.phone}
            </p>
            <p className="min-h-[128px]">
              {data?.getTempleDetail?.data?.description}
            </p>
            {data?.getTempleDetail?.data?.website && (
              <p className="mt-8">
                {localeText.temple.website}:{" "}
                {data?.getTempleDetail?.data.website}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TempleDetail;
