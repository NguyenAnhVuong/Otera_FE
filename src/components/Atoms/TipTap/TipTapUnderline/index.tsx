import { Icon } from "@iconify/react/dist/iconify.js";
import { Editor } from "@tiptap/react";
import React from "react";

type TipTapUnderlineProps = {
  editor: Editor;
};

const TipTapUnderline: React.FC<TipTapUnderlineProps> = ({ editor }) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        editor.chain().focus().toggleUnderline().run();
      }}
      className={
        editor.isActive("underline")
          ? "bg-black text-white p-2 rounded-lg "
          : "text-black p-2 "
      }
    >
      <Icon className="w-5 h-5" icon="lucide:underline" />
    </button>
  );
};

export default TipTapUnderline;
