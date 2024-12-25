import { Component } from '@angular/core';
import { EnterpriseGroup } from './crew';
import { TableColumn } from '../../components/table/TableColumn';
import { CurrencyPipe, DecimalPipe, PercentPipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConstructionService } from '../../construction.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sort } from '@angular/material/sort';
import { EditJobComponent } from '../../popups/edit-job/edit-job.component';
import { CrewDetailsComponent } from './crew-details/crew-details.component';
import { crewTable } from '../dashboard-home/jobs';
import { HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-crew',
  templateUrl: './crew.component.html',
  styleUrl: './crew.component.scss',
  providers: [CurrencyPipe, DecimalPipe, PercentPipe]
})
export class CrewComponent {
  isLoading: boolean = true;
  crewTable:crewTable[]=[];
  crewTableColumns: TableColumn[] = [];
    
  ordersTableColumns: TableColumn[] = [];
  crew: any;
  crewId: any;
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
    this.initializeCrewColumns();
    this.getAllCrewDashborad();
    
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
  

  
  onRowClicked(rowData: any) {
    console.log("Row data:", rowData);
    const dialogRef =this.dialog.open(CrewDetailsComponent,{
          data:{
           rowData:rowData,
           buttonLabel:"Edit Crew"
          },
          width: '80%', // Set the width of the dialog
          // Set the height of the dialog
        }
        
      )
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          this.getAllCrewDashborad();
        });
    // this.enterprisegroup();
    
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
  handleRowAction(event: any,) {
    console.log('Clicked:', event.option, 'with icon:', event.icon, 'for element:', event.element);
    // this.nameID=event.element.id;
    // sessionStorage.setItem("nameid", this.nameID);
    // console.log(this.nameID,'eventId');
    if (event.option === 'Delete') {
      this.crewId=event.element.crewid;
      console.log(this.crewId);
      this.cmsService.deleteCrewById(this.crewId,{ observe: 'response' }).subscribe({
        next: (response: HttpResponse<any>) => {
          console.log("Data Deleted:", response);
          if (response.status === 204) {
            this.snackbar.open('Crew deleted successfully', 'Close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
            // Optionally refresh the data table or list
            this.getAllCrewDashborad(); // Call a method to refresh your data
          } (error:any) => {
            this.snackbar.open('Failed to delete item', 'Close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
        }
        }
    })
    } else if(event.option === 'Edit') {
      this.routes.navigate(['/school-add'],{ state: { data: event.element } })
    }
  }
  openAdEnterpriseGroup(){

  }
  sortData(sortParameters: Sort) {
    const keyName: keyof crewTable = sortParameters.active as keyof crewTable;
    this.crewTable = this.crewTable.sort((a: crewTable, b: crewTable) =>
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
    this.isLoading=true;
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
        this.isLoading=false;
      }
  })
      
  }
}
