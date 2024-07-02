import UploadLabel from "@/components/Atoms/UploadLabel";
import UploadedLabel from "@/components/Molecules/UploadedLabel";
import React, { useEffect, useState } from "react";

type UploadSingleImageProps = {
  imageSrc?: string | null;
  setUploadImage: (file: File) => void;
  isReadOnly?: boolean;
};

const UploadSingleImage: React.FC<UploadSingleImageProps> = ({
  imageSrc,
  setUploadImage,
  isReadOnly = false,
}) => {
  const [preview, setPreview] = useState<string | null | undefined>(imageSrc);

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
        <UploadedLabel
          htmlFor={isReadOnly ? "isReadOnly" : "image"}
          preview={preview}
          isReadOnly={isReadOnly}
        />
      ) : (
        <UploadLabel htmlFor="image" />
      )}
      {!isReadOnly && (
        <input
          className="hidden"
          disabled={isReadOnly}
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={(e) =>
            handleUpload(e.target.files ? e.target.files[0] : null)
          }
        />
      )}
    </>
  );
};

export default UploadSingleImage;
