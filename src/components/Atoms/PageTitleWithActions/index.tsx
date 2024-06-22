import React from "react";

type PageTitleWithActionsProps = {
  title?: string;
  children?: React.ReactNode;
};

const PageTitleWithActions: React.FC<PageTitleWithActionsProps> = ({
  title,
  children,
}) => {
  return (
    <div className="flex items-center justify-between mt-8">
      <div className="mb-6">
        <h3 className="text-black m-0 font-bold">{title}</h3>
      </div>
      {children}
    </div>
  );
};

export default PageTitleWithActions;
