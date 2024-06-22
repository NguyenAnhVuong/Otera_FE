import { Icon } from "@iconify/react/dist/iconify.js";
import { Editor } from "@tiptap/react";

type TipTapCodeProps = {
  editor: Editor;
};

const TipTapCode: React.FC<TipTapCodeProps> = ({ editor }) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        editor.chain().focus().toggleCode().run();
      }}
      className={
        editor.isActive("code")
          ? "bg-black text-white p-2 rounded-lg "
          : "text-black p-2 "
      }
    >
      <Icon className="w-5 h-5" icon="lucide:code" />
    </button>
  );
};

export default TipTapCode;
