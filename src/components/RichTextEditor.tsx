"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import Highlight from "@tiptap/extension-highlight";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Blockquote from "@tiptap/extension-blockquote";
import CodeBlock from "@tiptap/extension-code-block";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const RichTextEditor = ({ value, onChange }: Props) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Underline,
      Strike,
      Highlight,
      Subscript,
      Superscript,
      Color,
      TextStyle,
      Heading.configure({ levels: [1, 2, 3] }),
      BulletList,
      OrderedList,
      ListItem,
      Blockquote,
      CodeBlock,
      HorizontalRule,
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
      Link.configure({ openOnClick: false }),
      Image,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[300px] w-full px-6 py-4 border border-gray-300 rounded-md focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 text-base prose max-w-none resize-none",
      },
      handlePaste(view, event) {
        // Try to preserve formatting from Word/Google Docs
        if (event.clipboardData) {
          const html = event.clipboardData.getData("text/html");
          if (html) {
            // Let Tiptap/ProseMirror handle HTML paste (it will keep most formatting)
            return false;
          }
        }
        return false;
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) return null;

  const isActive = (command: () => boolean) =>
    command() ? "bg-blue-500 text-white" : "";

  const addHeading = (level: 1 | 2 | 3) => () =>
    editor.chain().focus().toggleHeading({ level }).run();

  const isHeadingActive = (level: 1 | 2 | 3) =>
    editor.isActive("heading", { level });

  return (
    <div className="border rounded-md p-4 bg-white">
      <div className="flex flex-wrap gap-2 mb-4 items-center">
        {/* Text formatting */}
        <Button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={isActive(() => editor.isActive("bold"))}>B</Button>
        <Button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={isActive(() => editor.isActive("italic"))}><span style={{ fontStyle: 'italic' }}>I</span></Button>
        <Button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={isActive(() => editor.isActive("underline"))}><span style={{ textDecoration: 'underline' }}>U</span></Button>
        <Button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} className={isActive(() => editor.isActive("strike"))}><span style={{ textDecoration: 'line-through' }}>S</span></Button>
        <Button type="button" onClick={() => editor.chain().focus().toggleHighlight().run()} className={isActive(() => editor.isActive("highlight"))}>HL</Button>
        <Button type="button" onClick={() => editor.chain().focus().toggleSubscript().run()} className={isActive(() => editor.isActive("subscript"))}>X<sub>2</sub></Button>
        <Button type="button" onClick={() => editor.chain().focus().toggleSuperscript().run()} className={isActive(() => editor.isActive("superscript"))}>X<sup>2</sup></Button>
        {/* Color pickers */}
        <label className="ml-2 text-xs">Text Color
          <input
            type="color"
            className="ml-1 align-middle"
            value={editor.getAttributes("textStyle").color || "#000000"}
            onChange={e => editor.chain().focus().setColor(e.target.value).run()}
            style={{ width: 24, height: 24, border: 'none', background: 'none', verticalAlign: 'middle' }}
          />
        </label>
        <label className="ml-2 text-xs">Highlight
          <input
            type="color"
            className="ml-1 align-middle"
            value={editor.getAttributes("highlight").color || "#FFFF00"}
            onChange={e => editor.chain().focus().toggleHighlight({ color: e.target.value }).run()}
            style={{ width: 24, height: 24, border: 'none', background: 'none', verticalAlign: 'middle' }}
          />
        </label>
        {/* Headings */}
        <Button type="button" onClick={addHeading(1)} className={isActive(() => isHeadingActive(1))}>H1</Button>
        <Button type="button" onClick={addHeading(2)} className={isActive(() => isHeadingActive(2))}>H2</Button>
        <Button type="button" onClick={addHeading(3)} className={isActive(() => isHeadingActive(3))}>H3</Button>
        {/* Lists */}
        <Button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={isActive(() => editor.isActive("bulletList"))}>• List</Button>
        <Button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={isActive(() => editor.isActive("orderedList"))}>1. List</Button>
        {/* Block elements */}
        <Button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={isActive(() => editor.isActive("blockquote"))}>&quot;</Button>
        <Button type="button" onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={isActive(() => editor.isActive("codeBlock"))}>{"<>"}</Button>
        <Button type="button" onClick={() => editor.chain().focus().setHorizontalRule().run()}>HR</Button>
        {/* Table */}
        <Button type="button" onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}>Table</Button>
        {/* Link */}
        <Button type="button" onClick={() => {
          const url = prompt("Enter URL:", editor.getAttributes("link").href || "https://");
          if (url) editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
        }} className={isActive(() => editor.isActive("link"))}>Link</Button>
        <Button type="button" onClick={() => editor.chain().focus().unsetLink().run()}>Unlink</Button>
        {/* Image */}
        <Button type="button" onClick={() => {
          const url = prompt("Enter image URL:");
          if (url) editor.chain().focus().setImage({ src: url }).run();
        }}>Image</Button>
        {/* Text alignment */}
        <Button type="button" onClick={() => editor.chain().focus().setTextAlign("left").run()}>Left</Button>
        <Button type="button" onClick={() => editor.chain().focus().setTextAlign("center").run()}>Center</Button>
        <Button type="button" onClick={() => editor.chain().focus().setTextAlign("right").run()}>Right</Button>
        <Button type="button" onClick={() => editor.chain().focus().setTextAlign("justify").run()}>Justify</Button>
        {/* Clear formatting */}
        <Button type="button" onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}>Clear</Button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
