import { Icon } from "@iconify/react/dist/iconify.js";
import { Level } from "@tiptap/extension-heading";
import { Editor } from "@tiptap/react";

type TipTapHeadingProps = {
  editor: Editor;
  headingLevel: Level;
};

const TipTapHeading: React.FC<TipTapHeadingProps> = ({
  editor,
  headingLevel,
}) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        editor.chain().focus().toggleHeading({ level: headingLevel }).run();
      }}
      className={
        editor.isActive("heading", { level: headingLevel })
          ? "bg-black text-white p-2 rounded-lg "
          : "text-black p-2 "
      }
    >
      <Icon className="w-5 h-5" icon={`lucide:heading-${headingLevel}`} />
    </button>
  );
};

export default TipTapHeading;
