import Dexie, { Table } from "dexie";

export class InspectionReport extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  libraryItems!: Table<any>;
  inspectionReports!: Table<any>;
  jobs!: Table<any>;
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

interface User {
  email: string;
  role?: string;
}

export class IRAuser extends Dexie {
  user!: Table<User>;
  constructor() {
    super("ira-user");
    this.version(1).stores({
      user: "++email",
    });
  }
}

export const UserDB = new IRAuser();

export class Demo extends Dexie {
  demoData!: Table<any>;
  constructor() {
    super("demo-db");
    this.version(1).stores({
      demoData: "++id",
    });
  }
}

export const demoDb = new Demo();
