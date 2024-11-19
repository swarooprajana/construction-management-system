import { Component } from '@angular/core';
import { EnterpriseGroup } from './crew';
import { TableColumn } from '../../components/table/TableColumn';
import { CurrencyPipe, DecimalPipe, PercentPipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConstructionService } from '../../construction.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sort } from '@angular/material/sort';
@Component({
  selector: 'app-crew',
  templateUrl: './crew.component.html',
  styleUrl: './crew.component.scss',
  providers: [CurrencyPipe, DecimalPipe, PercentPipe]
})
export class CrewComponent {
  orders: EnterpriseGroup[] = [
    {
      sno: 1,
      Type: 'Highland Secondary School',
      From: 'John Doe',
      To: 'Jane Smith',
      Supervisor: 'Michael Lee',
      TotalCrew: 5,
      stuts: 'In Progress',
      customOptions: [
        {
          label: 'Edit',
          icon: 'edit', // Add material or custom icon if needed
          action: (rowData) => this.editOrder(rowData),
        },
        {
          label: 'Delete',
          icon: 'delete',
          action: (rowData) => this.deleteOrder(rowData),
        },
      ],
    },
    {
      sno: 2,
      Type: 'Riverside High School',
      From: 'Alice Johnson',
      To: 'Bob Brown',
      Supervisor: 'Sophia Martin',
      TotalCrew: 8,
      stuts: 'Completed',
      customOptions: [
        {
          label: 'Edit',
          icon: 'edit',
          action: (rowData) => this.editOrder(rowData),
        },
        {
          label: 'Delete',
          icon: 'delete',
          action: (rowData) => this.deleteOrder(rowData),
        },
      ],
    },
  ];
    
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
      { name: 'Type', dataKey: 'Type', position: 'left', isSortable: false,displayAsIcon: false,},
      { name: 'From', dataKey: 'From', position: 'left', isSortable: false,displayAsIcon: false,},
      { name: 'To', dataKey: 'To', position: 'left', isSortable: false,displayAsIcon: false,},
      { name: 'Supervisor', dataKey: 'Supervisor', position: 'left', isSortable: false,displayAsIcon: false,},
      { name: 'Total Crew', dataKey: 'TotalCrew', position: 'left', isSortable: false,displayAsIcon: false,},
      { name: 'Status', dataKey: 'stuts', position: 'left', isSortable: false,displayAsIcon: false,},

    //   { name: 'Status', dataKey: 'stuts', position: 'left', isSortable: false,displayAsIcon: false,},
      { name: 'Actions', dataKey: 'actions', position: 'left', isSortable: true, displayAsIcon: true, customOptions: [
        { label: 'Edit', icon: 'edit', action: this.editOrder },
        { label: 'Delete', icon: 'delete', action: this.deleteOrder }
      ]
    }
    ];
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
    console.log('Clicked:', event.option, 'with icon:', event.icon, 'for element:', event.element);
    // this.nameID=event.element.id;
    // sessionStorage.setItem("nameid", this.nameID);
    // console.log(this.nameID,'eventId');
    if (event.option === 'Delete') {
    //   const dialogRef =this.dialog.open(AlertpopupComponent,{
    //     data:{
    //       title:"Alert",
    //       message:"Are you sure want to Delete ?",
    //       buttonLabel:"Delete"
    //     }
    //   }
    // )
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
    } else if(event.option === 'Edit') {
      this.routes.navigate(['/school-add'],{ state: { data: event.element } })
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
}
