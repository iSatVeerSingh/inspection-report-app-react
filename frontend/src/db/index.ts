import Dexie, { Table } from "dexie";
import {
  InspectionNote,
  Job,
  JobCategory,
  LibraryItem,
  LibraryItemCategory,
} from "../types";

export class InspectionDatabase extends Dexie {
  user!: Table<any>;
  libraryItemCategories!: Table<LibraryItemCategory>;
  libraryItems!: Table<LibraryItem>;
  inspectionNotes!: Table<InspectionNote>;
  jobs!: Table<Job>;
  jobCategories!: Table<JobCategory>;

  constructor() {
    super("inspection-db");
    this.version(1).stores({
      user: "++type",
      libraryItemCategories: "++id, name",
      libraryItems: "++id, name, [category_id+updated_at], updated_at",
      inspectionNotes: "++id",
      jobs: "++jobNumber, id, [status+category+startsAt], [status+category], [status+startsAt], [category+startsAt]",
      jobCategories: "++id",
    });
  }
}

export const DB = new InspectionDatabase();
