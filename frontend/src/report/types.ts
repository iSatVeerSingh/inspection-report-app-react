export interface IReport {
  id?: string;
  name?: string;
  category?: string;
  jobNumber?: number;
  customer?: string;
  date?: Date;
  time?: string;
  siteAddress?: string;
  status?: string;

  inspectionNotes?: InspectionNote[];
}

export type InspectionNote = {
  id: string;
  note: string;
}

export interface IInspectionItem {
  id: string;
  category: string;
  itemName: string;
  children?: IItemChild[];
  images?: ItemImage[];
  note?: string;
}

export interface IItemChild {
  type: "PARAGRAPH" | "INLINE_IMAGE" | "ITEM_IMAGES_NOTES";
  image?: string;
  children?: {
    text: string;
    bold?: boolean;
    italics?: boolean;
    decoration?: "underline";
  }[];
}

export type ItemImage = string;