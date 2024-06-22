import { Icon } from "@iconify/react/dist/iconify.js";
import { Editor } from "@tiptap/react";

import PopupUrl from "@/components/Atoms/TipTap/PopupUrl";

type TipTapYoutubeProps = {
  editor: Editor;
};

const TipTapYoutube: React.FC<TipTapYoutubeProps> = ({ editor }) => {
  const handleSetYoutube = (url: string) => {
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("youtube").unsetLink().run();

      return;
    }
    editor.commands.setYoutubeVideo({
      src: url,
      width: 640,
      height: 480,
    });
  };

  return (
    <PopupUrl
      handleSetLinkToEditor={handleSetYoutube}
      isActive={editor.isActive("youtube")}
    >
      <Icon className="w-5 h-5" icon="lucide:youtube" />
    </PopupUrl>
  );
};

export default TipTapYoutube;
