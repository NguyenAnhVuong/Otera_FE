"use client";

import { Color } from "@tiptap/extension-color";
import Document from "@tiptap/extension-document";
import Gapcursor from "@tiptap/extension-gapcursor";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Paragraph from "@tiptap/extension-paragraph";
import Placeholder from "@tiptap/extension-placeholder";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Text from "@tiptap/extension-text";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Typography from "@tiptap/extension-typography";
import Underline from "@tiptap/extension-underline";
import Youtube from "@tiptap/extension-youtube";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "@/components/Molecules/Toolbar";
import { useEffect } from "react";
import useTrans from "@/hooks/useTrans";

type TipTapProps = {
  setContent: (newContent: string) => void;
  placeholder?: string;
  defaultValue?: string;
};

const Tiptap: React.FC<TipTapProps> = ({
  setContent,
  placeholder,
  defaultValue,
}) => {
  const { localeText } = useTrans();
  const handleChange = (newContent: string) => {
    setContent(newContent);
  };
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
        document: false,
        paragraph: false,
        text: false,
      }),
      Paragraph,
      Document,
      Text,
      Underline,
      Image,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TextStyle,
      Typography,
      Gapcursor,
      Color,
      Highlight,
      Link.configure({
        openOnClick: true,
        autolink: true,
      }),
      Placeholder.configure({
        // Use a placeholder:
        placeholder: placeholder ?? localeText.tiptap.placeholder,
        // Use different placeholders depending on the node type:
        // placeholder: ({ node }) => {
        //   if (node.type.name === 'heading') {
        //     return 'What’s the title?'
        //   }

        //   return 'Can you add some further context?'
        // },
      }),
      Subscript,
      Superscript,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Youtube,
    ],
    editorProps: {
      attributes: {
        class:
          "border-b border-r border-l border-gray-700 rounded-bl-md rounded-br-md outline-none text-left",
      },
    },
    onUpdate: ({ editor }) => {
      if (editor.getText()) {
        handleChange(editor.getHTML());
      } else {
        handleChange("");
      }
    },
  });

  useEffect(() => {
    if (defaultValue) {
      editor?.commands.setContent(defaultValue);
    }
  }, [defaultValue]);

  return (
    <div className="w-full px-4">
      <Toolbar editor={editor} />
      <EditorContent style={{ whiteSpace: "pre-line" }} editor={editor} />
    </div>
  );
};

export default Tiptap;
