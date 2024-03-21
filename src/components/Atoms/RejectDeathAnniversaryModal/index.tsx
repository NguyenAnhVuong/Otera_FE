import {
  EStatus,
  GetDeathAnniversariesDocument,
  useTempleUpdateDeathAnniversaryMutation,
} from "@/graphql/generated/schema";
import useTrans from "@/hooks/useTrans";
import { useAppSelector } from "@/rtk/hook";
import { Form, Input, Modal, Switch } from "antd";

type Props = {
  rejectDeathAnniversaryId: number | null;
  handleCloseModal: () => void;
};

const RejectDeathAnniversaryModal = ({
  rejectDeathAnniversaryId,
  handleCloseModal,
}: Props) => {
  const { TextArea } = Input;
  const { messageApi } = useAppSelector((state) => state.antd);
  const { localeText } = useTrans();
  const [form] = Form.useForm();
  const [templeUpdateDeathAnniversary] =
    useTempleUpdateDeathAnniversaryMutation();

  const handleOk = () => {
    form.submit();
  };

  const onFinish = async (values: any) => {
    if (!rejectDeathAnniversaryId) {
      messageApi.open({
        type: "error",
        content: localeText.deathAnniversary.rejectModal.rejectSuccessMessage,
      });
      return;
    }
    const templeUpdateDeathAnniversaryInput = {
      id: rejectDeathAnniversaryId,
      status: EStatus.Rejected,
      rejectReason: values.rejectReason,
      enableUpdate: values.enableUpdate,
    };

    const { data } = await templeUpdateDeathAnniversary({
      variables: {
        templeUpdateDeathAnniversaryInput,
      },
      refetchQueries: [
        {
          query: GetDeathAnniversariesDocument,
          variables: {
            getDeathAnniversariesInput: {
              // isPending: true,
            },
          },
        },
      ],
    });
    if (data && !data.templeUpdateDeathAnniversary.errorCode) {
      form.resetFields();
      handleCloseModal();
      messageApi.open({
        type: "success",
        content: localeText.deathAnniversary.rejectModal.rejectSuccessMessage,
      });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    messageApi.open({
      type: "error",
      content: localeText.deathAnniversary.rejectModal.rejectSuccessMessage,
    });
  };

  return (
    <Modal
      title={localeText.deathAnniversary.rejectModal.title}
      open={!!rejectDeathAnniversaryId}
      onOk={handleOk}
      onCancel={handleCloseModal}
      cancelText={localeText.deathAnniversary.rejectModal.cancelText}
    >
      <Form
        form={form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label={localeText.deathAnniversary.rejectModal.rejectReason}
          name="rejectReason"
          // rules={[{ required: true, message: "Please input your username!" }]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label={localeText.deathAnniversary.rejectModal.enableUpdate}
          name="enableUpdate"
          initialValue={true}
          valuePropName="checked"
        >
          <Switch defaultChecked />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RejectDeathAnniversaryModal;
