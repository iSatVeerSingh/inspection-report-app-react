import Dexie, { Table } from "dexie";
import {
  Inspection,
  InspectionNote,
  JobCategory,
  Job,
  LibraryItem,
  LibraryItemCategory,
} from "../../types";

export class InspectionDatabase extends Dexie {
  libraryItems!: Table<LibraryItem>;
  libraryItemCategories!: Table<LibraryItemCategory>;
  jobCategories!: Table<JobCategory>;
  inspectionNotes!: Table<InspectionNote>;
  inspections!: Table<Inspection>;
  jobs!: Table<Job>;
  libraryIndex!: Table<any>;
  template!: Table<any>;

  constructor() {
    super("inspection-db");
    this.version(1).stores({
      libraryItems: "++id, category, name, updated_at", // Primary key and indexed props
      libraryItemCategories: "++id, name",
      jobCategories: "++id, name",
      inspectionNotes: "++id, category",
      inspections: "++id, jobNumber, category, date, startDate",
      jobs: "++jobNumber, id, category, startDate",
      libraryIndex: "++id, item, category",
      template: "++id",
    });
  }
}

export const Db = new InspectionDatabase();

export class IRAUser extends Dexie {
  user!: Table<any>;

  constructor() {
    super("user");
    this.version(1).stores({
      user: "++user",
    });
  }
}

export const UserDB = new IRAUser();
