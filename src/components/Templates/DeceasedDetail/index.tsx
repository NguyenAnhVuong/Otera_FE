"use client";
import DeleteButton from "@/components/Atoms/DeleteButton";
import EditButton from "@/components/Atoms/EditButton";
import Loading from "@/components/Atoms/Loading";
import DeathAnniversaryInforModal from "@/components/Molecules/DeathAnniversaryInforModal";
import {
  Deceased,
  ERole,
  FamilyGetListDeceasedDocument,
  FamilyGetDeathAnniversariesDocument,
  GetDeceasedDocument,
  useCreateDeathAnniversaryMutation,
  useDeleteDeceasedMutation,
  useGetDeceasedQuery,
} from "@/graphql/generated/schema";
import useTrans from "@/hooks/useTrans";
import { useAppSelector } from "@/rtk/hook";
import { formatDate } from "@/utils/constants";
import { formatTimeDifference, getGenderText } from "@/utils/helper";
import { DeepPartial } from "@apollo/client/utilities";
import { Button, Carousel, Image as ImageAntd } from "antd";
import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

type DeceasedDetailProps = {
  id: number;
};

// TODO responsive
const DeceasedDetail: React.FC<DeceasedDetailProps> = ({ id }) => {
  const { role } = useAppSelector((state) => state.auth);
  const { messageApi } = useAppSelector((state) => state.antd);
  const [deceased, setDeceased] = useState<DeepPartial<Deceased>>();
  const [images, setImages] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const { localeText } = useTrans();
  const router = useRouter();
  // const [isRequested, setIsRequested] = useState(false);

  // current year death anniversary
  const deathAnniversary = new Date(
    new Date(`${deceased?.dateOfDeath}`).setFullYear(currentYear)
  );

  // register expired date this year (1 days before death anniversary)
  const registerExpiredDateThisYear = new Date(
    new Date(deathAnniversary).setDate(deathAnniversary.getDate() - 1)
  );

  const registerExpiredDate =
    deathAnniversary < currentDate
      ? new Date(
          new Date(registerExpiredDateThisYear).setFullYear(currentYear + 1)
        )
      : registerExpiredDateThisYear;

  const disableCreateDeathAnniversary =
    (registerExpiredDateThisYear <= currentDate &&
      deathAnniversary >= currentDate) ||
    !!deceased?.deathAnniversaries?.length;

  const ref: any = useRef();
  const goToSlide = (index: Number) => {
    ref.current.goTo(index);
  };

  // useCheckIsExistedRequestDeathAnniversaryQuery({
  //   variables: {
  //     deceasedId: id,
  //   },
  //   onCompleted: (data) => {
  //     if (data?.checkIsExistedRequestDeathAnniversary) {
  //       setIsRequested(data?.checkIsExistedRequestDeathAnniversary.data);
  //     }
  //   },
  //   fetchPolicy: "no-cache",
  //   notifyOnNetworkStatusChange: true,
  // });

  const { loading } = useGetDeceasedQuery({
    variables: {
      id: id,
    },
    onCompleted: (data) => {
      if (data?.getDeceased?.data) {
        const deceasedData = data?.getDeceased?.data;
        setDeceased(deceasedData);
        setImages([
          deceasedData.userDetail.avatar,
          ...(deceasedData.images
            ? deceasedData.images.map((image: any) => image.image)
            : []),
        ]);
      }
    },
    fetchPolicy: "no-cache",
    notifyOnNetworkStatusChange: true,
  });

  const [createDeathAnniversary, { loading: createDeathAnniversaryLoading }] =
    useCreateDeathAnniversaryMutation({
      refetchQueries: [
        FamilyGetDeathAnniversariesDocument,
        GetDeceasedDocument,
      ],
      onCompleted: () => {
        messageApi.open({
          type: "success",
          content: localeText.deathAnniversary.requestSuccessMessage,
        });
      },
      onError: () => {
        messageApi.error(localeText.deathAnniversary.requestFailMessage);
      },
    });

  const [deleteDeceased] = useDeleteDeceasedMutation({
    onCompleted: () => {
      messageApi.open({
        type: "success",
        content: localeText.deceased.deleteDeceasedSuccessMessage,
      });
      router.push("/deceased");
    },
    onError: () => {
      messageApi.error(localeText.deceased.deleteDeceasedFailMessage);
    },
    refetchQueries: [
      FamilyGetDeathAnniversariesDocument,
      FamilyGetListDeceasedDocument,
    ],
  });

  const handleRegisterDeathAnniversary = async (values: any) => {
    if (!deceased?.dateOfDeath) return;
    const createDeathAnniversaryInput = {
      deceasedId: id,
      desiredStartTime: new Date(
        new Date(
          `${deceased?.dateOfDeath} ${values.desiredTime[0].format("HH:mm")}`
        ).setFullYear(
          currentDate > deathAnniversary ? currentYear + 1 : currentYear
        )
      ),
      desiredEndTime: new Date(
        new Date(
          `${deceased?.dateOfDeath} ${values.desiredTime[1].format("HH:mm")}`
        ).setFullYear(
          currentDate > deathAnniversary ? currentYear + 1 : currentYear
        )
      ),
      note: values.note,
      isLiveStream: values.isLiveStream,
      offeringIds: values.offeringIds,
      deathAnniversaryType: values.deathAnniversaryType,
    };

    await createDeathAnniversary({
      variables: {
        createDeathAnniversaryInput,
      },
    });
  };

  return (
    <div className="lg:flex lg:justify-center lg:mt-10 lg:p-4">
      {(loading || createDeathAnniversaryLoading) && <Loading />}
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
                      alt={`deceased-image${index}`}
                    />
                  </div>
                );
              })}
            </Carousel>
          </div>
        </div>

        <div className="text-black lg:col-span-4 p-4 text-base font-medium lg:flex lg:flex-col lg:justify-between">
          <div>
            <div className="flex justify-between w-full items-center">
              <h2 className="text-2xl font-bold uppercase">
                {deceased?.userDetail?.name}
              </h2>
              {(role === ERole.FamilyAdmin || role === ERole.FamilyMember) && (
                <DeathAnniversaryInforModal
                  title={localeText.deceased.registerDeathAnniversary}
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}
                  handleSubmitForm={handleRegisterDeathAnniversary}
                  openButton={
                    <Button
                      type="primary"
                      className={
                        disableCreateDeathAnniversary
                          ? "text-black"
                          : "text-white"
                      }
                      onClick={() => setIsModalOpen(true)}
                      disabled={disableCreateDeathAnniversary}
                    >
                      {localeText.deceased.registerDeathAnniversary}
                    </Button>
                  }
                />
              )}
            </div>
            <div className="flex justify-between">
              <p>
                {localeText.deceased.gender}:{" "}
                {getGenderText(deceased?.userDetail?.gender)}
              </p>
              {/* TODO Assign admin can update and delete, and members can only upload images */}
              {(role === ERole.FamilyAdmin || role === ERole.FamilyMember) && (
                <div className="flex gap-2 items-center">
                  <EditButton
                    title={localeText.deceased.update}
                    onClick={() => router.push(`/deceased/${id}/update`)}
                  />

                  {role === ERole.FamilyAdmin && (
                    <DeleteButton
                      okText={localeText.OK}
                      cancelText={localeText.cancel}
                      tooltipTitle={localeText.deceased.delete}
                      popConfirmTitle={
                        localeText.deceased.deleteDeceasedPopConfirm.title
                      }
                      popConfirmDescription={
                        localeText.deceased.deleteDeceasedPopConfirm.description
                      }
                      popConfirmOnConfirm={async () =>
                        await deleteDeceased({
                          variables: {
                            id: +id,
                          },
                        })
                      }
                    />
                  )}
                </div>
              )}
            </div>
            <p>
              {localeText.deceased.birthday}:{" "}
              {dayjs(deceased?.userDetail?.birthday).format(
                formatDate.DD_MM_YYYY
              )}{" "}
            </p>
            <p>
              {localeText.deceased.dateOfDeath}:{" "}
              {dayjs(deceased?.dateOfDeath).format(formatDate.DD_MM_YYYY)}
            </p>
            {deceased?.dateOfDeath && (
              <p>
                {localeText.deceased.comingDeathAnniversary}:{" "}
                {dayjs(
                  new Date(deceased.dateOfDeath).setFullYear(
                    currentDate > deathAnniversary
                      ? currentYear + 1
                      : currentYear
                  )
                ).format(formatDate.DD_MM_YYYY)}
              </p>
            )}

            <p>
              {localeText.deceased.deathAnniversaryRegisterExpired}:{" "}
              {dayjs(registerExpiredDate).format(formatDate.DD_MM_YYYY)}
            </p>
            <p className="min-h-[128px]">{deceased?.description}</p>
            {deceased?.modifier && (
              <div>
                <span>{localeText.deceased.updateBy}: </span>
                <span>{deceased?.modifier.userDetail?.name}</span>
                <span> ({formatTimeDifference(deceased?.updatedAt)})</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeceasedDetail;
