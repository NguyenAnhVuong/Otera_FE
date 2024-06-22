import { Icon } from "@iconify/react/dist/iconify.js";
import { Editor } from "@tiptap/react";
import React from "react";

type TipTapBoldProps = {
  editor: Editor;
};

const TipTapBold: React.FC<TipTapBoldProps> = ({ editor }) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        editor.chain().focus().toggleBold().run();
      }}
      className={
        editor.isActive("bold")
          ? "bg-black text-white p-2 rounded-lg "
          : "text-black p-2 "
      }
    >
      <Icon className="w-5 h-5" icon="lucide:bold" />
    </button>
  );
};

export default TipTapBold;
