import DescriptionImage from "@/components/Molecules/DescriptionImage";
import MultipleImageInput from "@/components/Molecules/MultipleImageInput";
import React, { Dispatch, SetStateAction } from "react";

type UploadDescriptionImageProps = {
  oldDescriptionImages?: string[];
  setOldDescriptionImages?: Dispatch<SetStateAction<string[]>>;
  setNewDescriptionImages: Dispatch<SetStateAction<File[]>>;
  newDescriptionImagePreviews: string[];
  setNewDescriptionImagePreviews: Dispatch<SetStateAction<string[]>>;
};

const UploadDescriptionImage: React.FC<UploadDescriptionImageProps> = ({
  oldDescriptionImages,
  setOldDescriptionImages,
  setNewDescriptionImages,
  newDescriptionImagePreviews,
  setNewDescriptionImagePreviews,
}) => {
  const handleRemoveOldDescriptionImage = (
    removedOldDescriptionImage: string
  ) => {
    if (setOldDescriptionImages) {
      setOldDescriptionImages((oldDescriptionImages) =>
        oldDescriptionImages.filter(
          (oldDescriptionImage) =>
            oldDescriptionImage !== removedOldDescriptionImage
        )
      );
    }
  };

  const handleRemoveNewDescriptionImage = (
    removedNewDescriptionImage: string
  ) => {
    let removedIndex = -1;
    setNewDescriptionImagePreviews((newDescriptionImagePreviews) =>
      newDescriptionImagePreviews.filter(
        (newDescriptionImagePreview, index) => {
          if (newDescriptionImagePreview === removedNewDescriptionImage) {
            removedIndex = index;
            return false;
          } else {
            return true;
          }
        }
      )
    );

    if (removedIndex > -1) {
      setNewDescriptionImages((newDescriptionImages) =>
        newDescriptionImages.filter((_, index) => index !== removedIndex)
      );
    }
  };

  const handleUploadDescriptionImages = (files: FileList | null) => {
    if (!files) return;
    const uploadDescriptionImages: File[] = [];
    const uploadDescriptionImagePreviews: string[] = [];
    for (let i = 0; i < files.length; i++) {
      uploadDescriptionImages.push(files[i]);
      uploadDescriptionImagePreviews.push(URL.createObjectURL(files[i]));
    }
    setNewDescriptionImages((newDescriptionImages) => [
      ...newDescriptionImages,
      ...uploadDescriptionImages,
    ]);
    setNewDescriptionImagePreviews((newDescriptionImagePreviews) => [
      ...newDescriptionImagePreviews,
      ...uploadDescriptionImagePreviews,
    ]);
  };

  return (
    <div className="flex gap-2 flex-wrap">
      {oldDescriptionImages &&
        oldDescriptionImages.length > 0 &&
        oldDescriptionImages.map((oldDescriptionImage: string) => (
          <DescriptionImage
            key={oldDescriptionImage}
            imageSrc={oldDescriptionImage}
            handleRemove={handleRemoveOldDescriptionImage}
          />
        ))}
      {newDescriptionImagePreviews &&
        newDescriptionImagePreviews.length > 0 &&
        newDescriptionImagePreviews.map(
          (newDescriptionImagePreview: string) => (
            <DescriptionImage
              key={newDescriptionImagePreview}
              imageSrc={newDescriptionImagePreview}
              handleRemove={handleRemoveNewDescriptionImage}
            />
          )
        )}
      <MultipleImageInput onChange={handleUploadDescriptionImages} />
    </div>
  );
};

export default UploadDescriptionImage;
