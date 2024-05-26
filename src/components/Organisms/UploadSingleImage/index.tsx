import UploadLabel from "@/components/Atoms/UploadLabel";
import UploadedLabel from "@/components/Molecules/UploadedLabel";
import React, { useEffect, useState } from "react";

type UploadSingleImageProps = {
  imageSrc?: string;
  setUploadImage: (file: File) => void;
};

const UploadSingleImage: React.FC<UploadSingleImageProps> = ({
  imageSrc,
  setUploadImage,
}) => {
  const [preview, setPreview] = useState<string | undefined>(imageSrc);

  const handleUpload = (file: File | null) => {
    if (!file) return;
    try {
      setPreview(URL.createObjectURL(file));
    } catch (e) {}
    setUploadImage(file);
  };

  useEffect(() => {
    setPreview(imageSrc);
  }, [imageSrc]);

  return (
    <>
      {preview ? (
        <UploadedLabel htmlFor="image" preview={preview} />
      ) : (
        <UploadLabel htmlFor="image" />
      )}

      <input
        className="hidden"
        id="image"
        name="image"
        type="file"
        onChange={(e) =>
          handleUpload(e.target.files ? e.target.files[0] : null)
        }
      />
    </>
  );
};

export default UploadSingleImage;
