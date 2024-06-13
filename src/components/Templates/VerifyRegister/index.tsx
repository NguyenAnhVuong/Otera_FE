import Loading from "@/components/Atoms/Loading";
import { useVerifyRegisterMutation } from "@/graphql/generated/schema";
import useTrans from "@/hooks/useTrans";
import { Button, Result } from "antd";
import { ResultStatusType } from "antd/es/result";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type VerifyRegisterProps = {
  token?: string | null;
};

const VerifyRegister: React.FC<VerifyRegisterProps> = ({ token }) => {
  const [result, setResult] = useState<ResultStatusType>("info");
  const { localeText } = useTrans();
  const [verifyRegister, { loading }] = useVerifyRegisterMutation({
    onCompleted: (data) => {
      setResult("success");
    },
    onError: () => {
      setResult("error");
    },
  });

  useEffect(() => {
    if (!token) {
      setResult("error");
      return;
    }
    verifyRegister({
      variables: {
        token: token,
      },
    });
  }, [token, verifyRegister]);

  const getResultTitle = () => {
    switch (result) {
      case "success":
        return localeText.registerAccount.verifyResult.success;
      case "error":
        return localeText.registerAccount.verifyResult.fail;
      default:
        return localeText.registerAccount.verifyResult.verifying;
    }
  };

  const getResultSubTitle = () => {
    switch (result) {
      case "success":
        return localeText.registerAccount.verifyResult.successSubtitle;
      case "error":
        return localeText.registerAccount.verifyResult.failSubtitle;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-full justify-center">
      {(loading || result === null) && <Loading />}
      <div className="m-auto shadow-xl rounded-2xl">
        <Result
          status={result}
          title={getResultTitle()}
          subTitle={getResultSubTitle()}
          extra={[
            <Button type="primary" key="console">
              {result === "success" ? (
                <Link href="/login">{localeText.login.title}</Link>
              ) : (
                <Link href="/register">{localeText.register}</Link>
              )}
            </Button>,
          ]}
        />
      </div>
    </div>
  );
};

export default VerifyRegister;
