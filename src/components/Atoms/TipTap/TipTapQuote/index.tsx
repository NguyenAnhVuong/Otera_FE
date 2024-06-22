import { Icon } from "@iconify/react/dist/iconify.js";
import { Editor } from "@tiptap/react";

type TipTapQuoteProps = {
  editor: Editor;
};

const TipTapQuote: React.FC<TipTapQuoteProps> = ({ editor }) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        editor.chain().focus().toggleBlockquote().run();
      }}
      className={
        editor.isActive("blockquote")
          ? "bg-black text-white p-2 rounded-lg "
          : "text-black p-2 "
      }
    >
      <Icon className="w-5 h-5" icon="lucide:quote" />
    </button>
  );
};

export default TipTapQuote;
