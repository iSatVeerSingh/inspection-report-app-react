"use client";

import { useRef } from "react";
import PageLayout from "../Layout/PageLayout";
import Editor from "../components/Editor";
import { Button } from "@chakra-ui/react";
import { getParagraphDataFromEditor } from "../utils/editorData";
import { SerializedEditorState } from "lexical";

const LibraryEditor = () => {

  const editorRef = useRef({});

  const handleSave = () => {
    const paragraphData = getParagraphDataFromEditor(editorRef.current as SerializedEditorState)
    console.log(paragraphData)
  }

  return (
    <PageLayout title="Libary Editor">
      <Editor ref={editorRef} />
      <Button onClick={handleSave}>Save</Button>
    </PageLayout>
  )
}

export default LibraryEditor;