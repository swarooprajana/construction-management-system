import { CurrencyPipe, DecimalPipe, PercentPipe } from '@angular/common';
import { Component } from '@angular/core';
import { EnterpriseGroup } from './dialies';
import { TableColumn } from '../../components/table/TableColumn';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConstructionService } from '../../construction.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sort } from '@angular/material/sort';
import { dialiesTable } from '../dashboard-home/jobs';

@Component({
  selector: 'app-dialies-log',
  templateUrl: './dialies-log.component.html',
  styleUrl: './dialies-log.component.scss',
  providers: [CurrencyPipe, DecimalPipe, PercentPipe]
})
export class DialiesLogComponent {
  dialiesTable:dialiesTable[]=[];
  dialiesColumns: TableColumn[] = [];
  dailies: any;
  chartData: number[] = [];
  chartLabels: string[] = ['Completed', 'On Hold', 'In Progress'];
  chartColors: string[] = ['#0F0F10', '#595d5f', '#3357FF'];

  constructor(private currencyPipe: CurrencyPipe,
    private decimalPipe: DecimalPipe,
    private percentPipe: PercentPipe,private dialog:MatDialog,private routes:Router,private cmsService:ConstructionService,private snackbar:MatSnackBar) {
      const navigation = this.routes.getCurrentNavigation();
      if (navigation?.extras.state) {
        // this.rowData = navigation.extras.state['data'];
        // this.schoolId=this.rowData.id;
        // console.log('Received row data:', this.rowData,this.schoolId);

      }
}
  ngOnInit(): void {
    
    this.intializeDailiesColumns();
    this.getDailies();
    
  }
  intializeDailiesColumns():void{
    this.dialiesColumns=[
      { name: 'Type', dataKey: 'dialyJobType', position: 'left', isSortable: false,displayAsIcon: false  },
      { name: 'Completed Qty', dataKey: 'completedQty', position: 'left', isSortable: false,displayAsIcon: false  },
      { name: 'Completion Date', dataKey: 'completionDate', position: 'left', isSortable: false,displayAsIcon: false  },
      { name: 'Status', dataKey: 'stuts', position: 'left', isSortable: false,displayAsIcon: false  },
    ]
  }
  
  onRowClicked(rowData: any) {
    console.log("Row data:", rowData);

    // this.enterprisegroup();
    this.routes.navigate(['/School-Profile'],{ state: { data: rowData } });
  }
  openSchoolForm(){
    this.routes.navigate(['/school-add']);
  }
  goBack() {
    // this.location.back();
  }
  handleRowAction(event: any,) {
    // console.log('Clicked:', event.option, 'with icon:', event.icon, 'for element:', event.element);
    // this.nameID=event.element.id;
    // sessionStorage.setItem("nameid", this.nameID);
    // console.log(this.nameID,'eventId');
    // if (event.option === 'Delete') {
    //   const dialogRef =this.dialog.open(AlertpopupComponent,{
    //     data:{
    //       title:"Alert",
    //       message:"Are you sure want to Delete ?",
    //       buttonLabel:"Delete"
    //     }
    //   })
    //   dialogRef.afterClosed().subscribe(result => {
    //     console.log('The dialog was closed');
    //   });
    //   dialogRef.componentInstance.buttonClickFunction = () => {
    //     // this.adminService.enterpriseNameDelete(this.nameID).subscribe((data:any)=>
    //     //   {
    //     //     if(data['Status']===200){
    //     //       this.snackbar.open('School Deleted Successfully', 'Close', {
    //     //         duration: 4000,
    //     //         horizontalPosition: 'center',
    //     //         verticalPosition: 'top',
    //     //       })
    //     //     }
    //     //   })
    //     dialogRef.close();

    //   };
    // } else if(event.option === 'Edit') {
    //   this.routes.navigate(['/school-add'],{ state: { data: event.element } })
    // }
  }
  openAdEnterpriseGroup(){

  }
  sortData(sortParameters: Sort) {
    const keyName: keyof dialiesTable = sortParameters.active as keyof dialiesTable;
    this.dialiesTable = this.dialiesTable.sort((a: dialiesTable, b: dialiesTable) =>
      sortParameters.direction === 'asc'
        ? String(a[keyName]).localeCompare(String(b[keyName]))
        : String(b[keyName]).localeCompare(String(a[keyName]))
    );
  }

  editOrder(rowData: any): void {
    console.log('Editing order:', rowData);
  }

  deleteOrder(rowData: any): void {

    console.log('Deleting order:', rowData);
  }
  getDailies(){
    this.cmsService.getDailiesHistory().subscribe((data:any)=>{
      console.log(data,"dialies");
      this.dailies=data;
      console.log(this.dailies,"dialies apis");
      if (Array.isArray(data)) {
        // Map the array directly
        this.dialiesTable = data.map((item: any, index: number) => {
          const dialyJobType = item.job_type || '--';
          const completedQty = `${item.units_completed || 0} / ${item.total_units || 0}`;
          
          const completionDate = "--";
          const stuts=item.status;
          
         

          return {          
            dialyJobType,
            completedQty,           
            completionDate,
            stuts
 
          };
        });
        console.log(this.dialiesTable,"tabledialies");
      }
      this.processJobsData();
    })
  }
  processJobsData() {
    // Process the `dailies` data to calculate counts
    const completedCount = this.dailies.filter((job:any) => job.work_done_percentage === 100).length;
    const onHoldCount = this.dailies.filter((job:any) => job.status === 'On Hold').length;
    const inProgressCount = this.dailies.filter((job:any) => job.status === 'In Progress').length;

    // Update chartData dynamically
    this.chartData = [completedCount, onHoldCount, inProgressCount];
  }
}
