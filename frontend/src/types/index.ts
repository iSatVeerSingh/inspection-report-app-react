export type UserLogin = {
  email: string;
  password: string;
};

export type UserForm = {
  name: string;
  email: string;
  phone?: string;
  role: "Inspector" | "Owner" | "Admin";
  password: string;
};

export type User = UserForm & {
  id: number;
  created_at?: string;
  updated_at?: string;
};

export type Job = {
  id: number;
  jobNumber: string;
  category_id: number;
  category: string;
  customer: Customer;
  siteAddress: string;
  startsAt: string;
  endsAt: string;
  status: string;
  completedAt: string | null;
  description: string;
  inspector: string;
  inspector_id: number;
};

export type Customer = {
  nameOnReport: string;
  name: string;
  email: string;
  phone: string;
};

export type LibraryItem = {
  id: number;
  category_id?: number;
  category: string;
  name: string;
  openingParagraph: string;
  closingParagraph: string;
  embeddedImage?: string | null;
  summary?: string;
  created_at?: string;
  updated_at?: string;
};

export type LibraryItemCategory = {
  id: number;
  name: string;
  itemsCount: number;
  created_at?: string;
  updated_at?: string;
};

export type JobCategory = LibraryItemCategory;

export type InspectionNote = {
  id: number;
  // category: number;
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
