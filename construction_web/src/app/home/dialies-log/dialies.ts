export interface EnterpriseGroup {
    // sno: number;
    type: any;
    completedQty:any;
    completionDate:any;
    status:any;
    customOptions?: CustomOption[];
  }
  export interface CustomOption {
    label: string;
    icon: string;
    action: (rowData: any) => void;
  }