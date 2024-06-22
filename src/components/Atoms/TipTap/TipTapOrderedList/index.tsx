import { Icon } from "@iconify/react/dist/iconify.js";
import { Editor } from "@tiptap/react";

type TipTapOrderedListProps = {
  editor: Editor;
};

const TipTapOrderedList: React.FC<TipTapOrderedListProps> = ({ editor }) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        editor.chain().focus().toggleOrderedList().run();
      }}
      className={
        editor.isActive("orderedList")
          ? "bg-black text-white p-2 rounded-lg "
          : "text-black p-2 "
      }
    >
      <Icon className="w-5 h-5" icon="lucide:list-ordered" />
    </button>
  );
};

export default TipTapOrderedList;
