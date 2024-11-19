export interface EnterpriseGroup {
    sno: number;
    Type: any;
    From:any;
    To:any;
    Supervisor:any;
    TotalCrew:any;
    stuts:any
    customOptions?: CustomOption[];
  }
  export interface CustomOption {
    label: string;
    icon: string;
    action: (rowData: any) => void;
  }