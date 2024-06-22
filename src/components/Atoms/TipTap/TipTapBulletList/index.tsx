import { Icon } from "@iconify/react/dist/iconify.js";
import { Editor } from "@tiptap/react";

type TipTapBulletListProps = {
  editor: Editor;
};

const TipTapBulletList: React.FC<TipTapBulletListProps> = ({ editor }) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        editor.chain().focus().toggleBulletList().run();
      }}
      className={
        editor.isActive("bulletList")
          ? "bg-black text-white p-2 rounded-lg "
          : "text-black p-2 "
      }
    >
      <Icon className="w-5 h-5" icon="lucide:list" />
    </button>
  );
};

export default TipTapBulletList;
