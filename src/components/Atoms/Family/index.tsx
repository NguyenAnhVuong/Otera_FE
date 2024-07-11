import React from "react";

type FamilyProps = {
  name?: string | null;
  code?: string | null;
};

const Family: React.FC<FamilyProps> = ({ name, code }) => {
  return (
    <div className="flex">
      <div className="flex flex-col items-center">
        {name && <span className="font-bold truncate w-40">{name}</span>}
        {code && <span className="italic">{code}</span>}
      </div>
    </div>
  );
};

export default Family;
