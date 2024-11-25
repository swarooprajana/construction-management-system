import { Component } from '@angular/core';
import { TableColumn } from '../../components/table/TableColumn';
import { EnterpriseGroup } from './jobs';
import { CurrencyPipe, DecimalPipe, PercentPipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConstructionService } from '../../construction.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sort } from '@angular/material/sort';
import { CreateJobComponent } from '../../popups/create-job/create-job.component';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.scss',
  providers: [CurrencyPipe, DecimalPipe, PercentPipe]
})
export class DashboardHomeComponent {
  orders: EnterpriseGroup[] = [];
  ordersTableColumns: TableColumn[] = [];
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
    
    this.initializeColumns();
    
  }
  initializeColumns(): void {
    this.ordersTableColumns = [
      { name: 'Job ID', dataKey: 'sno', position: 'left', isSortable: false,displayAsIcon: false ,},
      { name: 'Type', dataKey: 'Schools', position: 'left', isSortable: false,displayAsIcon: false,},
      { name: 'From', dataKey: 'PrimaryCoordinator', position: 'left', isSortable: false,displayAsIcon: false,},
      { name: 'To', dataKey: 'SecondaryCoordinator', position: 'left', isSortable: false,displayAsIcon: false,},
      { name: 'Status', dataKey: 'LastVerifiedOn', position: 'left', isSortable: false,displayAsIcon: false,},
    //   { name: 'Status', dataKey: 'stuts', position: 'left', isSortable: false,displayAsIcon: false,},
    //   { name: 'Actions', dataKey: 'actions', position: 'left', isSortable: true, displayAsIcon: true, customOptions: [
    //     { label: 'Edit', icon: '', action: this.editOrder },
    //     { label: 'Delete', icon: '', action: this.deleteOrder }
    //   ]
    // }
    ];
  }
  
  onRowClicked(rowData: any) {
    console.log("Row data:", rowData);

    // this.enterprisegroup();
    this.routes.navigate(['/School-Profile'],{ state: { data: rowData } });
  }
  createJOb(){
    const dialogRef =this.dialog.open(CreateJobComponent,{
          data:{
            title:"Alert",
            message:"Are you sure want to Delete ?",
            buttonLabel:"Delete"
          }
        })
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
  }
  openSchoolForm(){
    
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
}
