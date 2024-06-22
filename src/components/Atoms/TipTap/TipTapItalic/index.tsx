import { Icon } from "@iconify/react/dist/iconify.js";
import { Editor } from "@tiptap/react";
import React from "react";

type TipTapItalicProps = {
  editor: Editor;
};

const TipTapItalic: React.FC<TipTapItalicProps> = ({ editor }) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        editor.chain().focus().toggleItalic().run();
      }}
      className={
        editor.isActive("italic")
          ? "bg-black text-white p-2 rounded-lg "
          : "text-black p-2 "
      }
    >
      <Icon className="w-5 h-5" icon="lucide:italic" />
    </button>
  );
};

export default TipTapItalic;
