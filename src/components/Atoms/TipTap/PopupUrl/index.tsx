import useTrans from "@/hooks/useTrans";
import { Button, Input, Popover } from "antd";
import { useState } from "react";

type PopupUrlProps = {
  handleSetLinkToEditor: (url: string) => void;
  children: React.ReactNode;
  isActive?: boolean;
};

const PopupUrl: React.FC<PopupUrlProps> = ({
  handleSetLinkToEditor,
  children,
  isActive,
}) => {
  const [isLinkPopoverOpen, setIsLinkPopoverOpen] = useState(false);
  const [url, setUrl] = useState("");
  const { localeText } = useTrans();

  const handleSetLink = () => {
    setUrl("");
    setIsLinkPopoverOpen(false);
    handleSetLinkToEditor(url);
  };

  return (
    <>
      <Popover
        content={
          <div className="p-1">
            <Input
              ref={(input) => input && input.focus()}
              placeholder="URL"
              size="small"
              className="w-60 mb-2"
              onChange={(e) => setUrl(e.target.value)}
            />
            <div className="flex w-full items-center gap-2 justify-center">
              <Button onClick={() => setIsLinkPopoverOpen(false)} size="small">
                {localeText.cancel}
              </Button>

              <Button type="primary" onClick={handleSetLink} size="small">
                {localeText.OK}
              </Button>
            </div>
          </div>
        }
        placement="bottom"
        open={isLinkPopoverOpen}
        trigger="click"
      >
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsLinkPopoverOpen(true);
          }}
          className={
            isActive
              ? "bg-black text-white p-2 rounded-lg "
              : "text-black p-2 hover:bg-black hover:text-white hover:rounded-lg"
          }
        >
          {children}
        </button>
      </Popover>
    </>
  );
};

export default PopupUrl;
