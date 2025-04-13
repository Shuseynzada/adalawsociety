// components/RichTextEditor.tsx
"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Heading from "@tiptap/extension-heading";
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
      Heading.configure({ levels: [1, 2, 3] }),
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
        if (!event.clipboardData) return false;
        const html = event.clipboardData.getData("text/html");
        if (html) {
          event.preventDefault();
          const plainText = event.clipboardData.getData("text/plain");
          view.dispatch(
            view.state.tr.replaceSelectionWith(
              view.state.schema.nodes.paragraph.create({}, view.state.schema.text(plainText))
            )
          );
          return true;
        }
        return false;
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value]);

  if (!editor) return null;

  const isActive = (command: () => boolean) => command() ? "bg-blue-500 text-white" : "";

  const addHeading = (level: number) => () => editor.chain().focus().toggleHeading({ level }).run();
  const isHeadingActive = (level: number) => editor.isActive("heading", { level });

  return (
    <div className="border rounded-md p-4 bg-white">
      <div className="flex flex-wrap gap-2 mb-4">
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          variant="outline"
          className={isActive(() => editor.isActive("bold"))}
        >
          Bold
        </Button>
        <Button
          type="button"
          onClick={addHeading(1)}
          variant="outline"
          className={isActive(() => isHeadingActive(1))}
        >
          H1
        </Button>
        <Button
          type="button"
          onClick={addHeading(2)}
          variant="outline"
          className={isActive(() => isHeadingActive(2))}
        >
          H2
        </Button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
