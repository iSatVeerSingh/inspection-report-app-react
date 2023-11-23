export type UserLogin = {
  email: string;
  password: string;
};

export type Job = {
  id: number;
  jobNumber: string;
  category: string;
  orderedAt?: string;
  customer: Customer;
  siteAddress: string;
  startDate: string;
  endDate: string;
  status: "In progress" | "Not started" | "Completed";
  completedAt?: string | Date;
  description?: string;
};

export type Customer = {
  nameOnReport: string;
  name: string;
  email: string;
  phone: string;
};

export type LibraryItem = {
  id: number;
  category: number;
  name: string;
  openingParagraph: string;
  closingParagraph: string;
  embeddedImage?: string;
  summary?: string;
  created_at?: string;
  updated_at?: string;
};

export type LibraryItemCategory = {
  id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
};

export type JobCategory = LibraryItemCategory;

export type InspectionNote = {
  id: number;
  category: number;
  text: string;
  created_at?: string;
  updated_at?: string;
};

export type InspectionItem = Partial<LibraryItem> & {
  isCustom?: boolean;
  job: number;
  libraryItem?: number;
  note?: string;
  images: string[];
  previousJob?: number;
  pageBreak?: boolean;
};

export type Inspection = Job & {
  inspectionType?: string;
  inspectionNotes?: string[];
  inspectionItems?: InspectionItem[];
  recommendation?: string;
};

export type Paragraph = {
  text: {
    text: string;
    bold?: boolean;
    italics?: boolean;
    decoration?: string | string[];
  }[];
};
