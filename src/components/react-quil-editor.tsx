"use client";
import React, { useCallback, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDebounce } from "@/hooks/use-debounce";
import QuillToolbar, { formats, modules } from "./editor-toolbar";

interface EditorProps {
  value: string;
  setValue: (value: string) => void;
}

const EditorComponent: React.FC<EditorProps> = ({ value, setValue }) => {
  const [editorContent, setEditorContent] = useState(value);
  const debouncedContent = useDebounce(editorContent, 500);

  useEffect(() => {
    setValue(debouncedContent);
  }, [debouncedContent, setValue]);

  const handleChange = useCallback((content: string) => {
    setEditorContent(content);
  }, []);

  return (
    <div className="">
      <QuillToolbar />
      <ReactQuill
        theme="snow"
        value={editorContent}
        onChange={handleChange}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

const Editor = React.memo(EditorComponent);

Editor.displayName = "Editor";

export default Editor;
