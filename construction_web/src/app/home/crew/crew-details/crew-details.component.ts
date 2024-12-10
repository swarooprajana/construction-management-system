import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConstructionService } from '../../../construction.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-crew-details',
  templateUrl: './crew-details.component.html',
  styleUrl: './crew-details.component.scss'
})
export class CrewDetailsComponent {
  @Input() buttonLabel: string='';
  logForm!:FormGroup;
  loginErrorMessage: any;
  crewid: any;

  constructor(private fb:FormBuilder,private router:Router,private snackBar: MatSnackBar,private constructionService:ConstructionService,public dialogRef: MatDialogRef<CrewDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,){
      console.log(data)
      if (data && data.rowData) {
        this.crewid = data.rowData.crewid; // Accessing crewid
        console.log('Crew ID:', this.crewid);
        this.getCrewById();
    
        // Perform any additional logic with the crewid
        // Example: Store it, make a service call, etc.
      } else {
        console.error('Invalid data received in dialog');
      }

  }
  ngOnInit() {
    this.logForm = this.fb.group({
      username: ['', [Validators.required]], // Wrap validators in an array
      phone: ['', [Validators.required]],// Validators already wrapped correctly here
      email:['', [Validators.required,Validators.email]],
      password:['', [Validators.required]],
      cpassword:['', [Validators.required]],
      role:['', [Validators.required]],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(500),
        ],
      ],
    });
  }
  getEmailErrorMessage() {
    const control = this.logForm.get('username');
    if (control?.hasError('required')) {
      return 'Email is required.';
    }
    if (control?.hasError('email')) {
      return 'Please enter a valid email address.';
    }
    return '';
  }
  onSubmit(){

  }
 
  handleFileUpload(file: File) {
    console.log('File uploaded:', file);
    // Add logic to upload or process the file
  }
  getCrewById(){
    this.constructionService.getByIdCrew(this.crewid, { observe: 'response' }).subscribe(
      (response: HttpResponse<any>) => {
        if (response.status === 200 && response.ok) {
          // Save the response body (job details)
          const crewData = response.body;
          console.log("crewdata", crewData);
          // this.jobCustomer=jobData.customer;
          // this.jobSupervisior=jobData.supervisor_name;
          // this.startDate=jobData.start_date;
          // this.endDate=jobData.end_date;
          // this.jobWorkDone=jobData.work_done_percentage;
          // this.jobOrderId=jobData.job_order_id;
          // this.jobType=jobData.job_type;
          this.logForm.patchValue({
            username:crewData.name,
            // workType:jobData.job_type,
            // description: jobData.note,
          });
          // // Example: Save to a variable (adjust as needed)
          // this.savedJobData = jobData; // Make sure `savedJobData` is defined in the class
  
          // Further processing, if needed
        } else {
          console.error('Unexpected response status:', response.status);
        }
      },
      (error) => {
        console.error('Failed to fetch job details:', error);
      }
    );
  }
}
