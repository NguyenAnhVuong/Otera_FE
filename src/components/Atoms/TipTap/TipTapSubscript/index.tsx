import { Icon } from "@iconify/react/dist/iconify.js";
import { Editor } from "@tiptap/react";

type TipTapSubscriptProps = {
  editor: Editor;
};

const TipTapSubscript: React.FC<TipTapSubscriptProps> = ({ editor }) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        editor.chain().focus().toggleSubscript().run();
      }}
      className={
        editor.isActive("subscript")
          ? "bg-black text-white p-2 rounded-lg "
          : "text-black p-2 "
      }
    >
      <Icon className="w-5 h-5" icon="lucide:subscript" />
    </button>
  );
};

export default TipTapSubscript;
