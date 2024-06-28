"use client";
import DeleteButton from "@/components/Atoms/DeleteButton";
import EditButton from "@/components/Atoms/EditButton";
import Loading from "@/components/Atoms/Loading";
import ContributeImageModal from "@/components/Molecules/ContributeImageModal";
import DeathAnniversaryInforModal from "@/components/Molecules/DeathAnniversaryInforModal";
import AlbumImage from "@/components/Organisms/AlbumImage";
import {
  Deceased,
  ERole,
  FamilyGetDeathAnniversariesDocument,
  FamilyGetListDeceasedDocument,
  GetDeceasedDocument,
  useCreateDeathAnniversaryMutation,
  useDeleteDeceasedMutation,
  useGetDeceasedQuery,
} from "@/graphql/generated/schema";
import useTrans from "@/hooks/useTrans";
import { useAppSelector } from "@/rtk/hook";
import { formatDate } from "@/utils/constants";
import {
  formatTimeDifference,
  getGenderText,
  getLongevity,
} from "@/utils/helper";
import { DeepPartial } from "@apollo/client/utilities";
import { Button, Divider, Image } from "antd";
import dayjs from "dayjs";
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
  const [images, setImages] = useState<string[]>([]);
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
  // trong khoang thoi gian 1 ngay truoc le gio thi k dc yeu cau
  const disableCreateDeathAnniversary =
    (registerExpiredDateThisYear <= currentDate &&
      deathAnniversary >= currentDate) ||
    !!deceased?.deathAnniversaries?.length;

  const ref: any = useRef();
  // const goToSlide = (index: Number) => {
  //   ref.current.goTo(index);
  // };

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
    <div className="lg:flex lg:justify-center mt-2 lg:p-4">
      {(loading || createDeathAnniversaryLoading) && <Loading />}
      <div className="grid grid-cols-3 w-full max-w-[1200px] gap-10">
        <div className="col-span-1 flex flex-col items-center">
          <div className="w-[200px] h-[200px] rounded-lg overflow-hidden mb-4">
            <Image
              src={deceased?.userDetail?.avatar}
              alt={localeText.deceased.avatar}
              width={200}
              height={200}
              className="object-cover rounded-lg "
            />
          </div>
          <div className="flex justify-end w-full">
            {(role === ERole.FamilyMember || role === ERole.FamilyAdmin) && (
              <ContributeImageModal deceasedId={+id} />
            )}
          </div>
          <Divider>{localeText.deceased.descriptionImages} </Divider>
          <AlbumImage images={images} />
        </div>

        <div className="col-span-2 text-black p-4 text-base font-medium lg:flex lg:flex-col lg:justify-between">
          <div className="px-2">
            <div className="flex justify-between w-full items-center mb-2">
              <h2 className="text-2xl font-semibold">
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
            <div className="flex justify-between mb-2">
              <p>
                {localeText.deceased.gender}:{" "}
                {getGenderText(deceased?.userDetail?.gender)}
              </p>

              <div className="flex gap-2 items-center">
                {role === ERole.FamilyAdmin && (
                  <>
                    <EditButton
                      title={localeText.deceased.update}
                      onClick={() => router.push(`/deceased/${id}/update`)}
                    />

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
                  </>
                )}
              </div>
            </div>
            {deceased?.userDetail?.birthday && deceased?.dateOfDeath && (
              <div>
                <div className="flex gap-5 mb-2">
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
                </div>
                <p className="mb-2">
                  {localeText.deceased.longevity}:{" "}
                  {getLongevity(
                    new Date(deceased.userDetail.birthday),
                    new Date(deceased.dateOfDeath)
                  )}{" "}
                  {localeText.deceased.age}
                </p>
              </div>
            )}
            <div className="flex gap-5 mb-2">
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
            </div>

            <div className="mb-2">
              <p>
                {localeText.deceased.address}: {deceased?.userDetail?.address}
              </p>
            </div>

            <div className="mb-2">
              <p>
                {localeText.deceased.tombAddress}: {localeText.temple.preName}{" "}
                {deceased?.temple?.name} - {deceased?.tombAddress}
              </p>
            </div>
          </div>
          <div
            className="tiptap min-h-min"
            dangerouslySetInnerHTML={{
              __html: deceased?.description || "",
            }}
          ></div>
          {deceased?.modifier && (
            <div className="mt-4 px-2">
              <span>{localeText.deceased.updateBy}: </span>
              <span>{deceased?.modifier.userDetail?.name}</span>
              <span> ({formatTimeDifference(deceased?.updatedAt)})</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeceasedDetail;
