import UploadLabel from "@/components/Atoms/UploadLabel";
import React, { ChangeEvent } from "react";

type MultipleImageInputProps = {
  onChange: (files: FileList | null) => void;
};

const MultipleImageInput: React.FC<MultipleImageInputProps> = ({
  onChange,
}) => {
  return (
    <>
      <input
        id="descriptionImages"
        name="descriptionImages"
        className="hidden"
        type="file"
        multiple
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.files)
        }
      />
      <UploadLabel htmlFor="descriptionImages" />
    </>
  );
};

export default MultipleImageInput;
