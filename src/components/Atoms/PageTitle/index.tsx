import React from "react";

type PageTitleProps = {
  title?: string;
};

const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  return (
    <div className="text-center">
      {title && <h3 className="text-2xl">{title}</h3>}
    </div>
  );
};

export default PageTitle;
