import { Icon } from "@iconify/react/dist/iconify.js";
import { Editor } from "@tiptap/react";

import PopupUrl from "@/components/Atoms/TipTap/PopupUrl";

type TipTapLinkProps = {
  editor: Editor;
};

const TipTapLink: React.FC<TipTapLinkProps> = ({ editor }) => {
  const handleSetLink = (url: string) => {
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <>
      <PopupUrl
        handleSetLinkToEditor={handleSetLink}
        isActive={editor.isActive("link")}
      >
        <Icon className="w-5 h-5" icon="lucide:link-2" />
      </PopupUrl>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().unsetLink().run();
        }}
        disabled={!editor.isActive("link")}
        className={
          "text-black p-2 hover:bg-black hover:text-white hover:rounded-lg  cursor-pointer "
        }
      >
        <Icon className="w-5 h-5" icon="lucide:link-2-off" />
      </button>
    </>
  );
};

export default TipTapLink;
