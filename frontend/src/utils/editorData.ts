import {
  SerializedEditorState,
  SerializedParagraphNode,
  SerializedTextNode,
} from "lexical";

type TextChild = {
  text: string;
  bold?: boolean;
  italics?: boolean;
  decoration?: string | string[];
};

const format: {
  [format: number]: Omit<TextChild, "text">;
} = {
  1: {
    bold: true,
  },
  2: {
    italics: true,
  },
  3: {
    bold: true,
    italics: true,
  },
  4: {
    decoration: "lineThrough",
  },
  5: {
    bold: true,
    decoration: "lineThrough",
  },
  6: {
    italics: true,
    decoration: "lineThrough",
  },
  7: {
    bold: true,
    italics: true,
    decoration: "lineThrough",
  },
  8: {
    decoration: "underline",
  },
  9: {
    bold: true,
    decoration: "underline",
  },
  10: {
    italics: true,
    decoration: "underline",
  },
  11: {
    bold: true,
    italics: true,
    decoration: "underline",
  },
  12: {
    decoration: ["underline", "lineThrough"],
  },
  13: {
    bold: true,
    decoration: ["underline", "lineThrough"],
  },
  14: {
    italics: true,
    decoration: ["underline", "lineThrough"],
  },
  15: {
    bold: true,
    italics: true,
    decoration: ["underline", "lineThrough"],
  },
};

export const getParagraphDataFromEditor = (
  editorState: SerializedEditorState
) => {
  const completeParagraph: any[] = [];
  const paragraphs = editorState.root.children;
  for (let i = 0; i < paragraphs.length; i++) {
    const paragraph = paragraphs[i] as SerializedParagraphNode;
    if (paragraph.type === "paragraph") {
      const newParagraph = {
        text: [] as TextChild[],
      };
      const paraChildrens = paragraph.children;
      for (let j = 0; j < paraChildrens.length; j++) {
        const subChild = paraChildrens[j] as SerializedTextNode;
        if (subChild.type === "text") {
          newParagraph.text.push({
            text: subChild.text,
            ...format[subChild.format],
          });
        }
      }
      if (newParagraph.text.length !== 0) {
        completeParagraph.push(newParagraph);
      }
    }
  }

  return completeParagraph;
};
