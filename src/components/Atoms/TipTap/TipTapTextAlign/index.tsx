import { Icon } from "@iconify/react/dist/iconify.js";
import { Editor } from "@tiptap/react";

type TipTapTextAlignProps = {
  editor: Editor;
  textAlign: string;
};

const TipTapTextAlign: React.FC<TipTapTextAlignProps> = ({
  editor,
  textAlign,
}) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        editor.chain().focus().setTextAlign(textAlign).run();
      }}
      className={
        editor.isActive({ textAlign: textAlign })
          ? "bg-black text-white p-2 rounded-lg "
          : "text-black p-2 "
      }
    >
      <Icon className="w-5 h-5" icon={`lucide:align-${textAlign}`} />
    </button>
  );
};

export default TipTapTextAlign;
