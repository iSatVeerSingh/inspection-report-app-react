"use client";
import "../styles/libraryEditor.css";

import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import {
  LexicalComposer,
  InitialConfigType,
} from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  EditorState,
  FORMAT_TEXT_COMMAND,
} from "lexical";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import {
  BoldIcon,
  ItalicIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from "../icons";
import React, { useCallback, useEffect, useRef, useState } from "react";

const editorConfig: InitialConfigType = {
  namespace: "LibraryEditor",
  theme: {
    text: {
      bold: "editor-text-bold",
      italic: "editor-text-italic",
      underline: "editor-text-underline",
      strikethrough: "editor-text-strikethrough",
      underlineStrikethrough: "editor-text-underlineStrikethrough",
    },
  },
  onError: (error: Error) => {
    console.log(error);
  },
};

const ToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
    }
  }, [editor]);

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        updateToolbar();
      });
    });
  }, [editor, updateToolbar]);

  return (
    <Flex gap={1}>
      <IconButton
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
        icon={<BoldIcon />}
        aria-label="Bold"
        size="sm"
        borderRadius="none"
        isActive={isBold}
      />
      <IconButton
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
        icon={<ItalicIcon />}
        aria-label="Italic"
        size="sm"
        borderRadius="none"
        isActive={isItalic}
      />
      <IconButton
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}
        icon={<UnderlineIcon />}
        aria-label="Underline"
        size="sm"
        isActive={isUnderline}
        borderRadius="none"
      />
      <IconButton
        onClick={() =>
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")
        }
        icon={<StrikethroughIcon />}
        aria-label="Strikethrough"
        size="sm"
        isActive={isStrikethrough}
        borderRadius="none"
      />
    </Flex>
  );
};

type EditorProps = {
  initialState?: any;
};

const Editor = ({ initialState }: EditorProps, ref: any) => {
  const editorRef = ref || useRef({});

  const onChange = (state: EditorState) => {
    const jsonState = state.toJSON();
    editorRef!.current = jsonState;
  };

  return (
    <Box bg={"main-bg"} p={3}>
      <LexicalComposer initialConfig={editorConfig}>
        <Box
          borderColor="blue-primary"
          borderWidth="1px"
          borderRadius="md"
          overflow={"hidden"}
        >
          <ToolbarPlugin />
          <Box position="relative">
            <RichTextPlugin
              contentEditable={<ContentEditable className="editor-input" />}
              placeholder={
                <Text position="absolute" top="5px" left="5px" opacity="0.5">
                  Start typing here
                </Text>
              }
              ErrorBoundary={LexicalErrorBoundary}
            />
          </Box>
        </Box>
        <OnChangePlugin onChange={onChange} />
      </LexicalComposer>
    </Box>
  );
};

export default React.forwardRef(Editor);
