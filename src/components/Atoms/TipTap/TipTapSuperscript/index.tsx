import { Icon } from "@iconify/react/dist/iconify.js";
import { Editor } from "@tiptap/react";

type TipTapSuperscriptProps = {
  editor: Editor;
};

const TipTapSuperscript: React.FC<TipTapSuperscriptProps> = ({ editor }) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        editor.chain().focus().toggleSuperscript().run();
      }}
      className={
        editor.isActive("superscript")
          ? "bg-black text-white p-2 rounded-lg "
          : "text-black p-2 "
      }
    >
      <Icon className="w-5 h-5" icon="lucide:superscript" />
    </button>
  );
};

export default TipTapSuperscript;
