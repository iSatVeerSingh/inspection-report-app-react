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
  if (
    editorState.root === undefined ||
    editorState.root.children === undefined
  ) {
    return completeParagraph;
  }
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

export const formattedParagraphToEditorState = (paragraphsData: any) => {
  const rootChildren: SerializedParagraphNode[] = [];

  for (let i = 0; i < paragraphsData.length; i++) {
    const paragraph = paragraphsData[i];
    const stateParagraphChilren: SerializedTextNode[] = [];
    for (let j = 0; j < paragraph.text.length; j++) {
      const subChild = paragraph.text[j];
      let formatNum = 0;
      for (const key in format) {
        const formatting = format[key];
        if (
          formatting.bold === subChild.bold &&
          formatting.italics === subChild.italics &&
          formatting.decoration === subChild.decoration
        ) {
          formatNum = Number(key);
        }
      }

      const stateChild: SerializedTextNode = {
        format: formatNum,
        detail: 0,
        mode: "normal",
        style: "",
        text: subChild.text,
        type: "text",
        version: 1,
      };

      stateParagraphChilren.push(stateChild);
    }

    const stateParagraph: SerializedParagraphNode = {
      direction: "ltr",
      format: "",
      indent: 0,
      type: "paragraph",
      version: 1,
      children: stateParagraphChilren,
    };

    rootChildren.push(stateParagraph);
  }

  const editorState: SerializedEditorState = {
    root: {
      children: rootChildren,
      direction: "ltr",
      format: "",
      indent: 0,
      type: "root",
      version: 1,
    },
  };

  return editorState;
};

export const editorState = JSON.stringify({
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 1,
            mode: "normal",
            style: "",
            text: "We've combined the power",
            type: "text",
            version: 1,
          },
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: " of the Following ",
            type: "text",
            version: 1,
          },
          {
            detail: 0,
            format: 2,
            mode: "normal",
            style: "",
            text: "feed with the For you ",
            type: "text",
            version: 1,
          },
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "feed so there’s one ",
            type: "text",
            version: 1,
          },
          {
            detail: 0,
            format: 8,
            mode: "normal",
            style: "",
            text: "place to discover content",
            type: "text",
            version: 1,
          },
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: " on GitHub. There’s improved filtering so you can customize your",
            type: "text",
            version: 1,
          },
          {
            detail: 0,
            format: 14,
            mode: "normal",
            style: "",
            text: " feed exactly how you like it, ",
            type: "text",
            version: 1,
          },
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "and a shiny new visual design",
            type: "text",
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
      },
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    type: "root",
    version: 1,
  },
});
