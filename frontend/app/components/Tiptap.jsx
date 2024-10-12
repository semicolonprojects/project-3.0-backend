"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import Heading from "@tiptap/extension-heading";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import TextAlign from "@tiptap/extension-text-align";

const Tiptap = ({ setContentArtikel }) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure(),
            Heading.configure({
                HTMLAttributes: {
                    className: "text-xl font-bold",
                    levels: [2],
                },
            }),
            Bold.configure({
                HTMLAttributes: {
                    className: "font-bold",
                },
            }),
            Italic.configure({
                HTMLAttributes: {
                    className: "italic",
                },
            }),
            Strike.configure({
                HTMLAttributes: {
                    className: "text-decoration-line: line-through;",
                },
            }),
            TextAlign.configure({
                types: ["heading", "paragraph"],
                alignments: ["left", "right", "center"],
            }),
        ],

        content: "This is the content",
        editorProps: {
            attributes: {
                className: "rounded-md border min-h-[150px] border-input p-6",
            },
        },
        onUpdate({ editor }) {
            setContentArtikel(editor.getHTML());
        },
    });

    return (
        <div className="flex flex-col justify-stretch min-h-[250px]">
            <Toolbar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );
};

export default Tiptap;
