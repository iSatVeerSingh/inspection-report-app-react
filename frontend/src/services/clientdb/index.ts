import Dexie, { Table } from "dexie";
import {
  InspectionNote,
  JobCategory,
  Job,
  LibraryItem,
  LibraryItemCategory,
  InspectionItem,
} from "../../types";

export class InspectionDatabase extends Dexie {
  libraryItemCategories!: Table<LibraryItemCategory>;
  libraryItems!: Table<LibraryItem>;
  libraryIndex!: Table<any>;
  inspectionNotes!: Table<InspectionNote>;
  jobCategories!: Table<JobCategory>;
  jobs!: Table<Job>;
  inspectionItems!: Table<InspectionItem>;
  sync!: Table<any>;
  // template!: Table<any>;

  constructor() {
    super("inspection-db");
    this.version(2).stores({
      libraryItemCategories: "++id, name",
      libraryItems: "++id, [category_id+updated_at], category_id, updated_at",
      libraryIndex: "++id",
      inspectionNotes: "++id, category",
      jobCategories: "++id",
      jobs: "++jobNumber, id, [status+category+startsAt], [status+category], [status+startsAt], [category+startsAt]",
      inspectionItems:
        "++id, job_id, library_item_id, isCustom, [job_id+isPreviousItem]",
      // template: "++id",
      sync: "type++",
    });
  }
}

export const Db = new InspectionDatabase();

export class IRAUser extends Dexie {
  user!: Table<any>;

  constructor() {
    super("user");
    this.version(1).stores({
      user: "++type",
    });
  }
}

export const UserDB = new IRAUser();
