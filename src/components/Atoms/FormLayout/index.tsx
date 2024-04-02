import useTrans from "@/hooks/useTrans";
import React from "react";

type FormLayoutProps = {
  children: React.ReactNode;
  title: string;
};

const FormLayout: React.FC<FormLayoutProps> = ({ children, title }) => {
  const { localeText } = useTrans();
  return (
    <div className="flex justify-center items-center pt-header">
      <div className="bg-white flex flex-col items-center px-12 py-4 pt-8 shadow-xl w-full max-w-[460px]">
        <h3 className="text-black">{title}</h3>
        {children}
      </div>
    </div>
  );
};

export default FormLayout;
