"use client";

import {
  Bold,
  Strikethrough,
  Italic,
  Heading2,
  AlignCenter,
  AlignLeft,
} from "lucide-react";

const Toolbar = ({ editor }) => {
  const handleButtonClick = (e, command) => {
    e.preventDefault(); // Prevent form submission
    editor.chain().focus();
    switch (command) {
      case "heading":
        editor.chain().focus().toggleHeading({ level: 2 }).run();
        break;
      case "bold":
        editor.chain().focus().toggleBold().run();
        break;
      case "italic":
        editor.chain().focus().toggleItalic().run();
        break;
      case "strike":
        editor.chain().focus().toggleStrike().run();
        break;
      case "left":
        editor.chain().focus().setTextAlign("left").run();
        break;
      case "center":
        editor.chain().focus().setTextAlign("center").run();
        break;
      default:
        editor.commands.enter();
        break;
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-row">
      <button
        onClick={(e) => handleButtonClick(e, "heading")}
        className={`button ${
          editor.isActive("heading", { level: 2 }) ? "is-active" : ""
        }`}
      >
        <Heading2
          className={`h-4 w-4 ${
            editor.isActive("heading", { level: 2 }) ? "bg-slate-400" : ""
          }`}
        />
      </button>

      <button
        onClick={(e) => handleButtonClick(e, "bold")}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        <Bold
          className={`h-4 w-4 ${editor.isActive("bold") ? "bg-slate-400" : ""}`}
        />
      </button>

      <button
        onClick={(e) => handleButtonClick(e, "italic")}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        <Italic
          className={`h-4 w-4 ${
            editor.isActive("italic") ? "bg-slate-400" : ""
          }`}
        />
      </button>
      <button
        onClick={(e) => handleButtonClick(e, "strike")}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        <Strikethrough
          className={`h-4 w-4 ${
            editor.isActive("strike") ? "bg-slate-400" : ""
          }`}
        />
      </button>

      <button
        onClick={(e) => handleButtonClick(e, "left")}
        className={editor.isActive({ textAlign: "left" }) ? "is-active" : ""}
      >
        <AlignLeft
          className={`h-4 w-4 ${
            editor.isActive({ textAlign: "left" }) ? "bg-slate-400" : ""
          }`}
        />
      </button>
      <button
        onClick={(e) => handleButtonClick(e, "center")}
        className={editor.isActive({ textAlign: "center" }) ? "is-active" : ""}
      >
        <AlignCenter
          className={`h-4 w-4 ${
            editor.isActive({ textAlign: "center" }) ? "bg-slate-400" : ""
          }`}
        />
      </button>
    </div>
  );
};

export default Toolbar;
