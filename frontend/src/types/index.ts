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
  startTime: string;
  status: JobStatus;
  completedAt: Date | string | null;
  description: string;
  inspector: string;
  inspector_id: number;
  inspectionNotes?: string[];
  recommendation?: string;
};

export enum JobStatus {
  WORK_ORDER = "Work Order",
  IN_PROGRESS = "In Progress",
  NOT_SUBMITTED = "Not Submitted",
  COMPLETED = "Completed",
}

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
  itemsCount?: number;
  created_at?: string;
  updated_at?: string;
};

export type JobCategory = Omit<LibraryItemCategory, "itemsCount">;

export type InspectionNote = {
  id: number;
  // category: number;
  text: string;
  created_at?: string;
  updated_at?: string;
};

export type InspectionItem = Partial<LibraryItem> & {
  id: number;
  job_id: number;
  library_item_id: number | null;
  isPreviousItem?: boolean;
  images?: string[] | null;
  note?: string | null;
  isCustom?: boolean;
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
