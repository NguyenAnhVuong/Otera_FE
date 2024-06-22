import { Icon } from "@iconify/react/dist/iconify.js";
import { Editor } from "@tiptap/react";

type TipTapTableProps = {
  editor: Editor;
};

const TipTapTable: React.FC<TipTapTableProps> = ({ editor }) => {
  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor
            .chain()
            .focus()
            .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
            .run();
        }}
        className="text-black p-2 hover:bg-black hover:text-white hover:rounded-lg  cursor-pointer "
      >
        <Icon className="w-5 h-5" icon="lucide:table" />
      </button>

      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().addColumnBefore().run();
        }}
        className="text-black p-2 hover:bg-black hover:text-white hover:rounded-lg  cursor-pointer "
      >
        <Icon className="w-5 h-5" icon="mdi:table-column-add-before" />
      </button>

      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().addColumnAfter().run();
        }}
        className="text-black p-2 hover:bg-black hover:text-white hover:rounded-lg  cursor-pointer "
      >
        <Icon className="w-5 h-5" icon="mdi:table-column-add-after" />
      </button>

      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().deleteColumn().run();
        }}
        className="text-black p-2 hover:bg-black hover:text-white hover:rounded-lg  cursor-pointer "
      >
        <Icon className="w-5 h-5" icon="mdi:table-column-remove" />
      </button>

      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().addRowBefore().run();
        }}
        className="text-black p-2 hover:bg-black hover:text-white hover:rounded-lg  cursor-pointer "
      >
        <Icon className="w-5 h-5" icon="mdi:table-row-add-before" />
      </button>

      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().addRowAfter().run();
        }}
        className="text-black p-2 hover:bg-black hover:text-white hover:rounded-lg  cursor-pointer "
      >
        <Icon className="w-5 h-5" icon="mdi:table-row-add-after" />
      </button>

      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().deleteRow().run();
        }}
        className="text-black p-2 hover:bg-black hover:text-white hover:rounded-lg  cursor-pointer "
      >
        <Icon className="w-5 h-5" icon="mdi:table-row-remove" />
      </button>

      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().mergeOrSplit().run();
        }}
        className="text-black p-2 hover:bg-black hover:text-white hover:rounded-lg  cursor-pointer "
      >
        <Icon className="w-5 h-5" icon="mdi:table-merge-cells" />
      </button>

      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleHeaderCell().run();
        }}
        className="text-black p-2 hover:bg-black hover:text-white hover:rounded-lg  cursor-pointer "
      >
        <Icon
          className="w-5 h-5"
          icon="fluent:layout-cell-four-focus-top-left-24-filled"
        />
      </button>

      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().deleteTable().run();
        }}
        className="text-black p-2 hover:bg-black hover:text-white hover:rounded-lg  cursor-pointer "
      >
        <Icon className="w-5 h-5" icon="mdi:table-remove" />
      </button>
    </>
  );
};

export default TipTapTable;
