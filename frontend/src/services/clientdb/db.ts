import Dexie, { Table } from 'dexie';

export class InspectionReport extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  libraryItems!: Table<any>; 

  constructor() {
    super('inspection-db');
    this.version(1).stores({
      libraryItems: '++id, category, itemName' // Primary key and indexed props
    });
  }
}

export const Db = new InspectionReport();