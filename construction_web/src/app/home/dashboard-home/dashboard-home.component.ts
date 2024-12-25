import { Component } from '@angular/core';
import { TableColumn } from '../../components/table/TableColumn';
import { crewTable, dialiesTable, EnterpriseGroup } from './jobs';
import { CurrencyPipe, DecimalPipe, PercentPipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConstructionService } from '../../construction.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sort } from '@angular/material/sort';
import { CreateJobComponent } from '../../popups/create-job/create-job.component';
import { EditJobComponent } from '../../popups/edit-job/edit-job.component';
import { HttpResponse } from '@angular/common/http';
import { CrewDetailsComponent } from '../crew/crew-details/crew-details.component';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.scss',
  providers: [CurrencyPipe, DecimalPipe, PercentPipe]
})
export class DashboardHomeComponent {
  orders: EnterpriseGroup[] = [];
  ordersTableColumns: TableColumn[] = [];
  crewTable:crewTable[]=[];
  crewTableColumns: TableColumn[] = [];
  dialiesTable:dialiesTable[]=[];
  dialiesColumns: TableColumn[] = [];
  isLoading=true;

  crew: any;
  jobs: any;
  jobId: any;
  dailies: any;
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
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
    this.initializeColumns();
    this.allJobs();
    this.initializeCrewColumns();
    this.intializeDailiesColumns();
    this.getAllCrewDashborad();
    this.getDailies();
    
  }
  initializeColumns(): void {
    this.ordersTableColumns = [
      { name: 'Job ID', dataKey: 'jobId', position: 'left', isSortable: false,displayAsIcon: false ,},
      { name: 'Type', dataKey: 'jobType', position: 'left', isSortable: false,displayAsIcon: false,},
      { name: 'From', dataKey: 'startDate', position: 'left', isSortable: false,displayAsIcon: false,},
      { name: 'To', dataKey: 'endDate', position: 'left', isSortable: false,displayAsIcon: false,},
      { name: 'Status', dataKey: 'status', position: 'left', isSortable: false,displayAsIcon: false,},
      { name: 'Actions', dataKey: 'actions', position: 'right', isSortable: true, displayAsIcon: true, customOptions: [
        { label: 'Edit', icon: 'edit', action: this.editOrder },
        { label: 'Delete', icon: 'delete', action: this.deleteOrder }
      ]
    },
    //   { name: 'Status', dataKey: 'stuts', position: 'left', isSortable: false,displayAsIcon: false,},
    //   { name: 'Actions', dataKey: 'actions', position: 'left', isSortable: true, displayAsIcon: true, customOptions: [
    //     { label: 'Edit', icon: '', action: this.editOrder },
    //     { label: 'Delete', icon: '', action: this.deleteOrder }
    //   ]
    // }
    ];
  }
  initializeCrewColumns(): void {
    this.crewTableColumns = [
      { name: 'Name', dataKey: 'crewName', position: 'left', isSortable: false,displayAsIcon: false  },
      { name: 'Crew ID', dataKey: 'crewid', position: 'left', isSortable: false,displayAsIcon: false  },
      { name: 'Available', dataKey: 'crewavailable', position: 'left', isSortable: false,displayAsIcon: false  },
      { name: 'Actions', dataKey: 'actions', position: 'right', isSortable: false, displayAsIcon: true, customOptions: [
        { label: 'Edit', icon: 'edit', action: this.editOrder },
        { label: 'Delete', icon: 'delete', action: this.deleteOrder }
      ]
    }
    ];
  }
  intializeDailiesColumns():void{
    this.dialiesColumns=[
      { name: 'Type', dataKey: 'dialyJobType', position: 'left', isSortable: false,displayAsIcon: false  },
      { name: 'Completed Qty', dataKey: 'completedQty', position: 'left', isSortable: false,displayAsIcon: false  },
      { name: 'Completion Date', dataKey: 'completionDate', position: 'left', isSortable: false,displayAsIcon: false  },
      { name: 'Status', dataKey: 'stuts', position: 'left', isSortable: false,displayAsIcon: false  },
    ]
  }
  
  onJobRowClicked(rowData: any) {
    console.log(rowData, "jobRow");
  
    const dialogRef = this.dialog.open(EditJobComponent, {
      data: {
        title: "Edit Job", // Update dialog title for clarity
        message: "Edit the details of the selected job.", // Modify message as needed
        jobId: rowData.jobId, // Pass the jobId from the rowData
        jobType: rowData.jobType, // Additional data can also be sent
        startDate: rowData.startDate,
        endDate: rowData.endDate,
        status: rowData.status,
        id:rowData.id,
      },
      width: "80%", // Set the dialog width
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed", result);
  
      if (result) {
        // Handle the result returned from the dialog if necessary
        console.log("Dialog result:", result);
      }
    });
  }
  
  onRowClicked(roeData:any){
    
  }
  createJOb(){
    const dialogRef =this.dialog.open(CreateJobComponent,{
          data:{
            title:"New Job",
            message:"Are you sure want to Delete ?",
            buttonLabel:"Create Job"
          }
        })
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          this.allJobs();

        });
  }
  openCrewForm(){
    const dialogRef =this.dialog.open(CrewDetailsComponent,{
      data:{
      rowData: null,
      buttonLabel:"Post Crew"
      },
      width: '80%', // Set the width of the dialog
      // Set the height of the dialog
    }
    
  )
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getAllCrewDashborad();
    });
  }
  goBack() {
    // this.location.back();
  }
  handleRowAction(event: any) {
    console.log('Clicked:', event.option, 'with icon:', event.icon, 'for element:', event.element);
    // this.nameID = event.element.id;
    // sessionStorage.setItem("nameid", this.nameID);
    // console.log(this.nameID, 'eventId');
  
    if (event.option === 'Delete') {
      this.jobId=event.element.id;
      console.log(this.jobId);
      this.cmsService.deleteJobById(this.jobId,{ observe: 'response' }).subscribe({
        next: (response: HttpResponse<any>) => {
          console.log("Data Deleted:", response);
          if (response.status === 204) {
            this.snackbar.open('Item deleted successfully', 'Close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
            // Optionally refresh the data table or list
            this.allJobs(); // Call a method to refresh your data
          } (error:any) => {
            this.snackbar.open('Failed to delete item', 'Close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
        }
        }
    })
  
    } else if (event.option === 'Edit') {
      console.log(event,"edit");
      const editDialogRef = this.dialog.open(CreateJobComponent, {
        width: '500px', // Adjust size as needed
        data: {
          title: "Edit Job", // Title to display in the popup
          rowData: event.element ,// Data to be edited
          buttonLabel:"Edit Job"
        }
      });
  
      editDialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log('Edited data:', result); // Process the edited data
         this.allJobs();
        }
      });
    }
  }
  
  openAdEnterpriseGroup(){

  }
  sortData(sortParameters: Sort) {
    const keyName: keyof EnterpriseGroup = sortParameters.active as keyof EnterpriseGroup;
    this.orders = this.orders.sort((a: EnterpriseGroup, b: EnterpriseGroup) =>
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
  getAllCrewDashborad(){
    this.cmsService.getAllCrew().subscribe((data:any)=>{
      this.crew=data;
      console.log(this.crew,"crew apis");
      if (Array.isArray(data)) {
        // Map the array directly
        this.crewTable = data.map((item: any, index: number) => {
          const crewName = item.name || '--';
          const crewid = item.crew_id
          || '--';
          
          const crewavailable = item.is_available || '--';
          
          const actions = [
              
            { label: 'Edit', icon: '', action: this.editOrder.bind(this, item) },
            { label: 'Delete', icon: '', action: this.deleteOrder.bind(this, item) }
          ];
         

          return {
            sno: index + 1,
            crewName,
            crewid,
            crewavailable,
            actions,
            
          };
        });
      }
  })
      
  }
  allJobs() {
    this.cmsService.getAllJobs().subscribe(
      (data: any) => {
        console.log("alljobs",data)
        if (Array.isArray(data)) {
          // Map the array directly

          this.orders = data.map((item: any, index: number) => {
            const jobId = item.job_order_id || '--';
            const jobType = item.job_type || '--';            
            const startDate = item.start_date || '--';
            const endDate = item.end_date || '--';
            const status = item.status || '--';
            const actions = [
              
              { label: 'Edit', icon: '', action: this.editOrder.bind(this, item) },
              { label: 'Delete', icon: '', action: this.deleteOrder.bind(this, item) }
            ];
  
            return {
              sno: index + 1,
              jobId,
              jobType,
              
              startDate,
              endDate,
              status,
              actions,
              id:item.id
            };
          });
  
          console.log(this.orders, "tabledata");
        } else {
          console.warn('Expected an array, but got:', data);
          this.orders = [];
        }
      },
      (error: any) => {
        console.error('Error fetching job list:', error);
      }
    );
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
    })
  }
  
}
