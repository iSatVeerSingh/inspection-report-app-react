import Dexie, { Table } from "dexie";
import { JobDetails, LibraryItem } from "../../types";

type JobTable = JobDetails & {
  created: string | Date;
};

export class InspectionReport extends Dexie {
  libraryItems!: Table<LibraryItem>;
  inspectionReports!: Table<any>;
  jobs!: Table<JobTable>;
  libraryIndex!: Table<any>;
  template!: Table<any>;

  constructor() {
    super("inspection-db");
    this.version(1).stores({
      libraryItems: "++id, category, itemName", // Primary key and indexed props
      inspectionReports: "++id, category, jobNumber, date, status",
      jobs: "++jobNumber, category",
      libraryIndex: "++id, item, category",
      template: "++id",
    });
  }
}

export const Db = new InspectionReport();

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
