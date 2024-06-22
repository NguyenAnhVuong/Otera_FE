import { Icon } from "@iconify/react/dist/iconify.js";
import { Editor } from "@tiptap/react";

type TipTapStrikeProps = {
  editor: Editor;
};

const TipTapStrike: React.FC<TipTapStrikeProps> = ({ editor }) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        editor.chain().focus().toggleStrike().run();
      }}
      className={
        editor.isActive("strike")
          ? "bg-black text-white p-2 rounded-lg "
          : "text-black p-2 "
      }
    >
      <Icon className="w-5 h-5" icon="lucide:strikethrough" />
    </button>
  );
};

export default TipTapStrike;
