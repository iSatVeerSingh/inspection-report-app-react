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

const formatting: {
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

export const demoEditorstate = JSON.stringify({
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "If we wanted to ",
            type: "text",
            version: 1,
          },
          {
            detail: 0,
            format: 3,
            mode: "normal",
            style: "",
            text: "make changes to the above",
            type: "text",
            version: 1,
          },
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: " ",
            type: "text",
            version: 1,
          },
          {
            detail: 0,
            format: 16,
            mode: "normal",
            style: "",
            text: "TextNode",
            type: "text",
            version: 1,
          },
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: ", we should be sure to not remove or ",
            type: "text",
            version: 1,
          },
          {
            detail: 0,
            format: 2,
            mode: "normal",
            style: "",
            text: "change an existing property",
            type: "text",
            version: 1,
          },
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: ", as this can cause data corruption. I",
            type: "text",
            version: 1,
          },
          {
            detail: 0,
            format: 8,
            mode: "normal",
            style: "",
            text: "nstead, opt to add the function",
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
      {
        children: [],
        direction: null,
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
      },
      {
        children: [
          {
            detail: 0,
            format: 4,
            mode: "normal",
            style: "",
            text: "functionality as a new property field instead,",
            type: "text",
            version: 1,
          },
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: " and use the version to determine how to handle the differences in your node.",
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

export const getParsedDataFromEditorState = (
  editorStateString: SerializedEditorState
) => {
  const editorState =
    typeof editorStateString === "string"
      ? JSON.parse(editorStateString)
      : editorStateString;

  const allParagraphs: { text: TextChild[] }[] = [];

  if (!editorState || !editorState.root || !editorState.root.children) {
    return allParagraphs;
  }

  const editorParagraphs = editorState.root.children;

  for (let i = 0; i < editorParagraphs.length; i++) {
    const editorPara = editorParagraphs[i] as SerializedParagraphNode;
    if (editorPara.children.length === 0) {
      continue;
    }

    const pdfParagraph: { text: TextChild[] } = {
      text: [],
    };

    for (let j = 0; j < editorPara.children.length; j++) {
      const subSpan = editorPara.children[j] as SerializedTextNode;

      const pdfSpan = {
        text: subSpan.text,
        ...formatting[subSpan.format],
      };

      pdfParagraph.text.push(pdfSpan);
    }

    allParagraphs.push(pdfParagraph);
  }

  return allParagraphs;
};

export const parsedDataToEditorState = (dataString: string) => {
  const allParagraphs = JSON.parse(dataString) as { text: TextChild[] }[];

  const editorState: SerializedEditorState = {
    root: {
      direction: "ltr",
      format: "",
      indent: 0,
      type: "root",
      version: 1,
      children: [],
    },
  };

  for (let i = 0; i < allParagraphs.length; i++) {
    const pdfParagraph = allParagraphs[i];

    const editorParagraphNode: SerializedParagraphNode = {
      children: [],
      direction: "ltr",
      format: "",
      indent: 0,
      type: "paragraph",
      version: 1,
    };

    for (let j = 0; j < pdfParagraph.text.length; j++) {
      const pdfSpan = pdfParagraph.text[j];

      let format = 0;
      for (let key in formatting) {
        if (
          pdfSpan.bold === formatting[key].bold &&
          pdfSpan.italics === formatting[key].italics &&
          pdfSpan.decoration === formatting[key].decoration
        ) {
          format = Number(key);
        }
      }

      const editorTextNode: SerializedTextNode = {
        detail: 0,
        mode: "normal",
        style: "",
        type: "text",
        version: 1,
        format,
        text: pdfSpan.text,
      };

      editorParagraphNode.children.push(editorTextNode);
    }

    editorState.root.children.push(editorParagraphNode);
  }

  return JSON.stringify(editorState);
};
