import { Icon } from "@iconify/react/dist/iconify.js";
import { Editor } from "@tiptap/react";
import React, { useState } from "react";
import { CirclePicker } from "react-color";

import { colorPickerOptions } from "@/utils/constants";
import useTrans from "@/hooks/useTrans";
import { Popover } from "antd";

type TipTapTextColorProps = {
  editor: Editor;
};

const TipTapTextColor: React.FC<TipTapTextColorProps> = ({ editor }) => {
  const { localeText } = useTrans();
  const [textColor, setTextColor] = useState("");

  const handleChangeTextColor = (color: string) => {
    editor.chain().focus().setColor(color).run();
    setTextColor(color);
  };

  const handleResetTextColor = () => {
    editor.chain().focus().unsetColor().run();
    setTextColor("");
  };

  return (
    <Popover
      content={
        <div className="p-2">
          <CirclePicker
            color={editor.getAttributes("textStyle").color}
            onChange={(color) => handleChangeTextColor(color.hex)}
            colors={colorPickerOptions}
          />
          <div className="w-full">
            <div className="border-t border-solid border-gray-500 mt-2"></div>
            <button
              onClick={handleResetTextColor}
              className="flex w-full items-center rounded-b-xl gap-2 py-2  justify-center hover:bg-black hover:text-white cursor-pointer "
            >
              <Icon
                className="w-5 h-5"
                icon="material-symbols:format-color-reset-outline"
              />
              <span>{localeText.tiptap.resetColor}</span>
            </button>
          </div>
        </div>
      }
      placement="bottom"
      trigger="click"
    >
      <button className="text-black p-2 ">
        <div
          className="w-5 h-5 border-2 rounded-full border-black bg-black "
          style={{ backgroundColor: `${textColor}` }}
        ></div>
      </button>
    </Popover>
  );
};

export default TipTapTextColor;
