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

export type JobDetails = {
  jobNumber: string | number;
  jobType: string;
  customer: string;
  customerEmail?: string;
  customerPhone?: string;
  date: string;
  time: string;
  siteAddress: string;
  description?: string;
  status?: "Not started" | "In progress" | "Completed";
  inspection?: string;
};

export type Inspection = JobDetails & {
  id: string | number;
  category: string;
  startedAt: string | Date;
  completedAt?: string | Date;
  inspectionNotes?: InspectionNote[];
  inspectionItems?: InspectionItem[];
};

export type InspectionNote = string;

export type InspectionItem = LibraryItem & {
  note?: string;
  images?: ItemImage;
};

export type ItemImage = string;
