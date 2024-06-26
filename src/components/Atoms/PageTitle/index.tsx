import React from "react";

type PageTitleProps = {
  title?: string;
  size?: "small" | "medium" | "large";
};

const PageTitle: React.FC<PageTitleProps> = ({ title, size }) => {
  switch (size) {
    case "small":
      return (
        <div className="text-center">
          {title && <h3 className="text-xl">{title}</h3>}
        </div>
      );
    default:
      return (
        <div className="text-center">
          {title && <h3 className="text-2xl">{title}</h3>}
        </div>
      );
  }
};

export default PageTitle;
