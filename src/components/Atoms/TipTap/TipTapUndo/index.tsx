import { Icon } from "@iconify/react/dist/iconify.js";
import { Editor } from "@tiptap/react";

type TipTapUndoProps = {
  editor: Editor;
};

const TipTapUndo: React.FC<TipTapUndoProps> = ({ editor }) => {
  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().undo().run();
        }}
        className={
          editor.isActive("undo")
            ? "bg-black text-white p-2 rounded-lg "
            : "text-black p-2 hover:bg-black hover:text-white hover:rounded-lg  cursor-pointer "
        }
      >
        <Icon className="w-5 h-5" icon="lucide:undo" />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().redo().run();
        }}
        className={
          editor.isActive("redo")
            ? "bg-black text-white p-2 rounded-lg "
            : "text-black p-2 hover:bg-black hover:text-white hover:rounded-lg  cursor-pointer "
        }
      >
        <Icon className="w-5 h-5" icon="lucide:redo" />
      </button>
    </>
  );
};

export default TipTapUndo;
