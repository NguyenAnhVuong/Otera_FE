import React from "react";

type FamilyProps = {
  name: string;
  code: string;
};

const Family: React.FC<FamilyProps> = ({ name, code }) => {
  return (
    <div className="flex">
      <div className="flex flex-col items-start">
        <span className="font-bold truncate w-40">{name}</span>
        <span className="italic">{code}</span>
      </div>
    </div>
  );
};

export default Family;
