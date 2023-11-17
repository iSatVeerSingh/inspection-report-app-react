import { Paragraph } from "../types";

export const getItemPargarph = (paragraph: string): Paragraph[] | string => {
  try {
    const paragraphs = JSON.parse(paragraph);
    return paragraphs as Paragraph[];
  } catch (err) {
    return paragraph;
  }
};
