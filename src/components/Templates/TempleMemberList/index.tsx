"use client";
import PageTitleWithActions from "@/components/Atoms/PageTitleWithActions";
import InviteMemberModal from "@/components/Molecules/InviteMemberModal";
import TempleMemberTable from "@/components/Organisms/TempleMemberTable";
import {
  GetTempleMembersDocument,
  useAddTempleMemberMutation,
} from "@/graphql/generated/schema";
import useTrans from "@/hooks/useTrans";
import { useAppSelector } from "@/rtk/hook";
import React from "react";

type TempleMemberListProps = {};

const TempleMemberList: React.FC<TempleMemberListProps> = ({}) => {
  const { localeText } = useTrans();
  const { messageApi } = useAppSelector((state) => state.antd);
  const [addTempleMember] = useAddTempleMemberMutation({
    onCompleted: () => {
      messageApi.success(localeText.temple.members.addMemberSuccessMessage);
    },
    onError: () => {
      messageApi.error(localeText.temple.members.addMemberFailMessage);
    },
    refetchQueries: [GetTempleMembersDocument],
  });

  const handleAddTempleMember = async (email: string) => {
    await addTempleMember({
      variables: {
        addTempleMemberInput: {
          email,
        },
      },
    });
  };

  return (
    <div>
      <PageTitleWithActions title={localeText.temple.members.title}>
        <InviteMemberModal
          title={localeText.temple.addMember}
          okText={localeText.add}
          handleInviteMember={handleAddTempleMember}
        />
      </PageTitleWithActions>
      <TempleMemberTable />
    </div>
  );
};

export default TempleMemberList;
