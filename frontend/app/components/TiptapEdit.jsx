import React, { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import Heading from "@tiptap/extension-heading";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import TextAlign from "@tiptap/extension-text-align";

const TiptapEdit = ({ isiArtikel, setContentArtikel }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      Heading.configure({
        HTMLAttributes: {
          class: "text-xl font-bold",
          levels: [2],
        },
      }),
      Bold.configure({
        HTMLAttributes: {
          class: "font-bold",
        },
      }),
      Italic.configure({
        HTMLAttributes: {
          class: "italic",
        },
      }),
      Strike.configure({
        HTMLAttributes: {
          class: "text-decoration-line: line-through;",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "right", "center"],
      }),
    ],
    content: isiArtikel,
    editorProps: {
      attributes: {
        class: "rounded-md border min-h-[150px] border-input p-6",
      },
    },
  });

  useEffect(() => {
    if (editor && isiArtikel) {
      console.log("Setting content in editor:", isiArtikel);
      editor.commands.setContent(isiArtikel);
    }
  }, [editor, isiArtikel]);

  useEffect(() => {
    if (editor && setContentArtikel) {
      const onUpdate = () => {
        const newContent = editor.getHTML();
        setContentArtikel(newContent);
      };
      editor.on("update", onUpdate);
      return () => {
        editor.off("update", onUpdate);
      };
    }
  }, [editor, setContentArtikel]);

  return (
    <div className="flex flex-col justify-stretch min-h-[250px]">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapEdit;
