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
import Link from "next/link";
import { useRef, useState } from "react";

type TempleDetailProps = {
  templeId: number;
};

const TempleDetail: React.FC<TempleDetailProps> = ({ templeId }) => {
  const { localeText } = useTrans();
  const { messageApi } = useAppSelector((state) => state.antd);
  const { id, role } = useAppSelector((state) => state.auth);
  const [images, setImages] = useState<string[]>([]);
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
      <div className="lg:w-[1200px]">
        <div className="grid grid-cols-2 gap-4 px-2 font-medium">
          <div className="">
            <Carousel
              className="lg:rounded-lg lg:overflow-hidden"
              dots={false}
              autoplay={true}
              arrows
              infinite
            >
              {images.map((image: string, index: number) => {
                return (
                  <div className="max-h-[280px]" key={index}>
                    <ImageAntd
                      className="lg:rounded-lg lg:overflow-hidden lg:object-cover h-[280px]"
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
          <div>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-2xl font-semibold">
                {localeText.temple.preName} {data?.getTempleDetail?.data?.name}
              </h2>
            </div>
            <p className="mb-2">
              {localeText.temple.address}:{" "}
              {data?.getTempleDetail?.data?.address}
            </p>
            <p className="mb-2">
              {localeText.temple.phone}: {data?.getTempleDetail?.data?.phone}
            </p>
            <p className="mb-2">
              {localeText.temple.email}: {data?.getTempleDetail?.data?.email}
            </p>
            {data?.getTempleDetail?.data?.website && (
              <p className="mb-2">
                {localeText.temple.website}:{" "}
                <Link
                  href={
                    data?.getTempleDetail?.data.website.includes("https://")
                      ? data?.getTempleDetail?.data.website
                      : `https://${data?.getTempleDetail?.data.website}`
                  }
                  target="_blank"
                >
                  {data?.getTempleDetail?.data.website}
                </Link>
              </p>
            )}
            <div className="mt-8">
              {!!id &&
                (role === ERole.FamilyAdmin ||
                  role === ERole.FamilyMember ||
                  role === ERole.PublicUser) && (
                  <FollowButton
                    isFollowing={
                      !!data?.getTempleDetail?.data.followerTemples.length
                    }
                    handleFollow={follow}
                    handleUnFollow={unFollow}
                  />
                )}
            </div>
          </div>
        </div>

        <div
          className="tiptap"
          dangerouslySetInnerHTML={{
            __html: data?.getTempleDetail?.data?.description || "",
          }}
        ></div>
      </div>
    </div>
  );
};

export default TempleDetail;
