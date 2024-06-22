import { Icon } from "@iconify/react/dist/iconify.js";
import { Editor } from "@tiptap/react";
import React from "react";

type TipTapHightLightProps = {
  editor: Editor;
};

const TipTapHighlight: React.FC<TipTapHightLightProps> = ({ editor }) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        editor.chain().focus().toggleHighlight().run();
      }}
      className={
        editor.isActive("highlight")
          ? "bg-black text-white p-2 rounded-lg "
          : "text-black p-2 "
      }
    >
      <Icon className="w-5 h-5" icon="lucide:pencil-line" />
    </button>
  );
};

export default TipTapHighlight;
