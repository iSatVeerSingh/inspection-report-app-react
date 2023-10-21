import { IReport, InspectionNote } from "./types";

export class Report implements IReport {
  id?: string;
  name?: string;
  category?: string;
  customer?: string;
  date?: Date;
  inspectionNotes?: InspectionNote[] | undefined;
  jobNumber?: number;
  siteAddress?: string;
  status?: string;
  time?: string;
  constructor({
    name,
    jobNumber,
    siteAddress,
    time,
    category,
    customer,
    date,
  }: Partial<IReport>) {
    this.id = Date.now().toString(36);
    this.name = name,
    this.jobNumber = jobNumber;
    this.siteAddress = siteAddress;
    this.time = time;
    this.category = category;
    this.customer = customer;
    this.date = date
  }
}
