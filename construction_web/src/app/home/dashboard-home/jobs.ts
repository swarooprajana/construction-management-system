export interface EnterpriseGroup {
  sno: number;
  jobId: string;
  jobType: string;
  from?: string; // Optional property if not always present
  to?: string;   // Optional property if not always present
  startDate: string;
  endDate: string;
  status: string;
  id:any;
  
}
export interface crewTable{
  crewName:string;
  crewid:any;
  crewavailable:any
}