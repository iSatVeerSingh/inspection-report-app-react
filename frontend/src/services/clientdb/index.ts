import Dexie, { Table } from "dexie";

export class InspectionReport extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  libraryItems!: Table<any>;

  constructor() {
    super("inspection-db");
    this.version(1).stores({
      libraryItems: "++id, category, itemName", // Primary key and indexed props
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

export class Jobs extends Dexie {
  jobs!: Table<any>;
  constructor() {
    super("jobs");
    this.version(1).stores({
      jobs: "++id"
    })
  }
}

export const JobsDB = new Jobs();