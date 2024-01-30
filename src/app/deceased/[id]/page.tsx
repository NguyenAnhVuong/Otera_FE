"use client";
import {
  Deceased,
  useCreateDeathAnniversaryMutation,
  useGetDeceasedQuery,
} from "@/graphql/generated/schema";
import { useAppSelector } from "@/rtk/hook";
import { getGenderText } from "@/utils/helper";
import { DeepPartial } from "@apollo/client/utilities";
import {
  Button,
  Carousel,
  DatePicker,
  Form,
  Image as ImageAntd,
  Modal,
  Radio,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const { RangePicker } = DatePicker;

type Props = {
  params: { id: string };
};

const DeceasedDetail = ({ params }: Props) => {
  const { messageApi } = useAppSelector((state) => state.antd);
  const [deceased, setDeceased] = useState<DeepPartial<Deceased>>();
  const [images, setImages] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const enableCreateDeathAnniversary =
    new Date(new Date(`${deceased?.dateOfDeath}`).setFullYear(currentYear)) <
    currentDate;
  // const [visible, setVisible] = useState(false);
  // const [currentImage, setCurrentImage] = useState(0);
  const ref: any = useRef();
  const goToSlide = (index: Number) => {
    ref.current.goTo(index);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { data } = useGetDeceasedQuery({
    variables: {
      id: Number(params.id),
    },
  });
  const [createDeathAnniversary] = useCreateDeathAnniversaryMutation();

  const onFinish = async (values: any) => {
    const createDeathAnniversaryInput = {
      deceasedId: Number(params.id),
      desiredStartTime: dayjs(
        new Date(
          `${deceased?.dateOfDeath} ${values.desiredTime[0].format("HH:mm")}`
        ).setFullYear(currentYear)
      ).format("YYYY-MM-DD HH:mm"),
      desiredEndTime: dayjs(
        new Date(
          `${deceased?.dateOfDeath} ${values.desiredTime[1].format("HH:mm")}`
        ).setFullYear(currentYear)
      ).format("YYYY-MM-DD HH:mm"),
      note: values.note,
      isLiveStream: values.isLivestream,
    };

    const { data } = await createDeathAnniversary({
      variables: {
        createDeathAnniversaryInput,
      },
    });

    if (data && !data.createDeathAnniversary.errorCode) {
      setIsModalOpen(false);
      form.resetFields();
      messageApi.open({
        type: "success",
        content: "Đăng ký thành công!",
      });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
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

              <Button
                type="primary"
                className={
                  enableCreateDeathAnniversary ? "text-black" : "text-white"
                }
                onClick={showModal}
                disabled={enableCreateDeathAnniversary}
              >
                Đăng ký lễ giỗ
              </Button>
            </div>
            <p>Giới tính: {getGenderText(deceased?.userDetail?.gender)}</p>
            <p>Ngày sinh: {deceased?.userDetail?.birthday} </p>
            <p>Ngày mất: {deceased?.dateOfDeath} </p>
            <p className="min-h-[128px]">{deceased?.description}</p>
          </div>
        </div>
      </div>
      <Modal
        title="Đăng ký tổ chức lễ giỗ"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className="flex justify-center"
        cancelText="Hủy"
        okText="Đăng ký"
      >
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Thời gian mong muốn"
            name="desiredTime"
            rules={[
              { required: true, message: "Please input your desiredTime!" },
            ]}
          >
            <RangePicker picker="time" format="HH:mm" />
          </Form.Item>
          <Form.Item label="Ghi chú" name="note">
            <TextArea rows={4} className="w-[320px]" />
          </Form.Item>
          <Form.Item
            label="Tổ chức livestream"
            name="isLivestream"
            rules={[
              { required: true, message: "Please input your isLivestream!" },
            ]}
            initialValue={false}
          >
            <Radio.Group>
              <Radio value={true}>Có</Radio>
              <Radio value={false}>Không</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DeceasedDetail;
