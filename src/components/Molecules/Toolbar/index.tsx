"use client";

import { type Editor } from "@tiptap/react";
import React from "react";

import TipTapBold from "@/components/Atoms/TipTap/TipTapBold";
import TipTapBulletList from "@/components/Atoms/TipTap/TipTapBulletList";
import TipTapCode from "@/components/Atoms/TipTap/TipTapCode";
import TipTapHeading from "@/components/Atoms/TipTap/TipTapHeading";
import TipTapHighlight from "@/components/Atoms/TipTap/TipTapHighlight";
import TipTapImage from "@/components/Atoms/TipTap/TipTapImage";
import TipTapItalic from "@/components/Atoms/TipTap/TipTapItalic";
import TipTapLink from "@/components/Atoms/TipTap/TipTapLink";
import TipTapOrderedList from "@/components/Atoms/TipTap/TipTapOrderedList";
import TipTapStrike from "@/components/Atoms/TipTap/TipTapStrike";
import TipTapSubscript from "@/components/Atoms/TipTap/TipTapSubscript";
import TipTapSuperscript from "@/components/Atoms/TipTap/TipTapSuperscript";
import TipTapTable from "@/components/Atoms/TipTap/TipTapTable";
import TipTapTextAlign from "@/components/Atoms/TipTap/TipTapTextAlign";
import TipTapTextColor from "@/components/Atoms/TipTap/TipTapTextColor";
import TipTapUnderline from "@/components/Atoms/TipTap/TipTapUnderline";
import TipTapUndo from "@/components/Atoms/TipTap/TipTapUndo";
import TipTapYoutube from "@/components/Atoms/TipTap/TipTapYoutube";

type ToolbarProps = {
  editor: Editor | null;
};

const Toolbar: React.FC<ToolbarProps> = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div
      className="px-4 py-3 rounded-tl-md rounded-tr-md flex justify-between items-start
    gap-5 w-full flex-wrap border border-gray-700"
    >
      <div className="flex justify-start items-center gap-2 w-full flex-wrap ">
        <TipTapTextColor editor={editor} />
        <TipTapHighlight editor={editor} />
        <TipTapBold editor={editor} />
        <TipTapItalic editor={editor} />
        <TipTapUnderline editor={editor} />
        <TipTapStrike editor={editor} />
        <TipTapHeading editor={editor} headingLevel={1} />
        <TipTapHeading editor={editor} headingLevel={2} />
        <TipTapHeading editor={editor} headingLevel={3} />
        <TipTapSubscript editor={editor} />
        <TipTapSuperscript editor={editor} />
        <TipTapTextAlign editor={editor} textAlign="left" />
        <TipTapTextAlign editor={editor} textAlign="center" />
        <TipTapTextAlign editor={editor} textAlign="right" />
        <TipTapBulletList editor={editor} />
        <TipTapOrderedList editor={editor} />
        <TipTapLink editor={editor} />
        <TipTapCode editor={editor} />
        <TipTapImage editor={editor} />
        <TipTapYoutube editor={editor} />
        <TipTapTable editor={editor} />
        <TipTapUndo editor={editor} />
      </div>
    </div>
  );
};

export default Toolbar;
