export type UserLogin = {
  email: string;
  password: string;
};

export type LibraryItem = {
  id: number | string;
  category: string;
  name: string;
  openingParagraph: string | Paragraph[];
  closingParagraph: string | Paragraph[];
  embeddedImage?: string;
  summary?: string;
};

export type Paragraph = {
  text: {
    text: string;
    bold?: boolean;
    italics?: boolean;
    decoration?: string | string[];
  }[];
};
