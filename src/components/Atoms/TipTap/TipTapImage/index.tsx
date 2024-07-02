/* eslint-disable jsx-a11y/label-has-associated-control */
import { uploadApi } from "@/api/uploadApi";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Editor } from "@tiptap/react";

type TipTapImageProps = {
  editor: Editor;
};

const TipTapImage: React.FC<TipTapImageProps> = ({ editor }) => {
  const uploadImage = async (files: FileList | null) => {
    if (!files) return;
    const file = files[0];
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await uploadApi.uploadImage(formData);
      editor.chain().focus().setImage({ src: res.data.url }).run();
    } catch (e) {}
  };

  return (
    <>
      <label
        className="text-black p-2 hover:bg-black hover:text-white hover:rounded-lg  cursor-pointer "
        htmlFor="tiptap-image-input"
      >
        <Icon className="w-5 h-5" icon="lucide:image" />
      </label>
      <input
        id="tiptap-image-input"
        type="file"
        accept="image/*"
        hidden
        onChange={(event) => uploadImage(event.target.files)}
      />
    </>
  );
};

export default TipTapImage;
