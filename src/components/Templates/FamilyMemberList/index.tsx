"use client";
import Loading from "@/components/Atoms/Loading";
import PageTitleWithActions from "@/components/Atoms/PageTitleWithActions";
import InviteMemberModal from "@/components/Molecules/InviteMemberModal";
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
    onCompleted: () => {
      messageApi.success(localeText.family.familyMember.inviteSuccessMessage);
      form.resetFields();
    },
    onError: () => {
      messageApi.error(localeText.family.familyMember.inviteFailedMessage);
    },
  });

  const handleInviteFamilyMember = async (inviteEmail: string) => {
    await inviteFamilyMember({
      variables: {
        inviteFamilyInput: {
          email: inviteEmail,
        },
      },
    });
  };

  return (
    <div>
      {loading && <Loading />}
      <PageTitleWithActions title={data?.getFamily.data.name}>
        <InviteMemberModal handleInviteMember={handleInviteFamilyMember} />
      </PageTitleWithActions>
      <FamilyMemberTable familyId={familyId} />
    </div>
  );
};

export default FamilyMemberList;
