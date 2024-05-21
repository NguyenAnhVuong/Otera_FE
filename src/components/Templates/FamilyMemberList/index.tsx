"use client";
import Loading from "@/components/Atoms/Loading";
import PageTitleWithActions from "@/components/Atoms/PageTitleWithActions";
import FamilyMemberTable from "@/components/Organisms/FamilyMemberTable";
import {
  useGetFamilyQuery,
  useInviteToFamilyMutation,
} from "@/graphql/generated/schema";
import useTrans from "@/hooks/useTrans";
import { useAppSelector } from "@/rtk/hook";
import { Button, Form, Input, Modal } from "antd";
import React, { useState } from "react";

type FamilyMemberListProps = {
  familyId?: number | null;
};

const FamilyMemberList: React.FC<FamilyMemberListProps> = ({ familyId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const { messageApi } = useAppSelector((state) => state.antd);
  const { localeText } = useTrans();
  const [form] = Form.useForm();
  const { data, loading } = useGetFamilyQuery({
    variables: {
      id: familyId as number,
    },
    skip: !familyId,
  });

  const [inviteFamilyMember] = useInviteToFamilyMutation({
    variables: {
      inviteFamilyInput: {
        email: inviteEmail,
      },
    },
    onCompleted: () => {
      messageApi.success(localeText.family.familyMember.inviteSuccessMessage);
    },
    onError: (error) => {
      messageApi.error(localeText.family.familyMember.inviteFailedMessage);
    },
  });

  const handleInviteFamilyMember = async () => {
    await inviteFamilyMember();
  };

  const handleOK = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setInviteEmail("");
  };

  return (
    <div>
      {loading && <Loading />}
      {/* TODO separate components family actions */}
      <PageTitleWithActions title={data?.getFamily.data.name}>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          {localeText.family.familyMember.add}
        </Button>
        <Modal
          title={localeText.family.familyMember.addMessage}
          open={isModalOpen}
          onOk={handleOK}
          onCancel={handleCancel}
          cancelText={localeText.close}
          okText={localeText.send}
        >
          <Form
            initialValues={{ remember: true }}
            onFinish={handleInviteFamilyMember}
            form={form}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: localeText.validateMessages.required(
                    localeText.email
                  ),
                },
                {
                  type: "email",
                  message: localeText.validateMessages.types.email,
                },
              ]}
            >
              <Input
                placeholder={localeText.family.familyMember.email}
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
              />
            </Form.Item>
          </Form>
        </Modal>
      </PageTitleWithActions>
      <FamilyMemberTable familyId={familyId} />
    </div>
  );
};

export default FamilyMemberList;
