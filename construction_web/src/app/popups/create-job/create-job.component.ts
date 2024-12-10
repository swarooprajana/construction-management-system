import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConstructionService } from '../../construction.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.scss'],
})
export class CreateJobComponent implements OnInit {
  @Input() buttonLabel: string='';
  logForm!: FormGroup;
  uploadedFiles: File[] = [];
  selectedCrew: string[] = [];
  crewOptions: string[] = ['Lela Widerman', 'Colin Von', 'Travis Jakubowski', 'Alice Doe', 'John Smith'];
  startDate: any;
  endDate:any;
  jobCustomer: any;
  jobSupervisior: any;
  jobStartDate: any;
  jobEndDate: any;
  jobWorkDone: any;
  jobOrderId: any;
  jobType: any;
  savedJobData: any;
  id: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private constructionService: ConstructionService,
    public dialogRef: MatDialogRef<CreateJobComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
   console.log(data);
   if(this.data.rowData){
    this.id=this.data.rowData.id;
    console.log(this.id);
   }
   
  }

  ngOnInit() {
    this.logForm = this.fb.group({
      workOrderId: ['', Validators.required],
      workType: ['', Validators.required],
     
      description: [
        '',
        [Validators.required, Validators.minLength(10), Validators.maxLength(500)],
      ],
      
    });
    if(this.id){
      this.getidByJob()
    }
    
  }

  onSubmit() {
    if (this.logForm.valid) {
      const formData = this.logForm.value;
      const formattedStartDate = this.startDate
      ? new Date(this.startDate).toISOString().slice(0, 10)
      : null;
    const formattedEndDate = this.endDate
      ? new Date(this.endDate).toISOString().slice(0, 10)
      : null;
      // Construct job object dynamically
      const jobAdd = {
        job_order_id: formData.workOrderId,
        job_type: formData.workType,
        customer: 'Customer 1', // Replace with dynamic data if available
        start_date: formattedStartDate,
        end_date:formattedEndDate,
        note: formData.description,
        crews: this.selectedCrew.map((crew) => this.crewOptions.indexOf(crew) + 1), // Map crew to IDs
        total_units: 10,
      };
      if(!this.id){
        this.constructionService.createJob(jobAdd).subscribe({
          next: (data: any) => {
            if (data?.Status === 200) {
              this.snackBar.open('Job created successfully!', 'Close', {
                duration: 3000,
                verticalPosition: 'top',
              });
              this.router.navigate(['/jobs']); // Redirect to job list
            }
          },
          error: (err) => {
            console.error('Error:', err);
            this.snackBar.open('Failed to create the job. Please try again.', 'Close', {
              duration: 3000,
              verticalPosition: 'top',
            });
          },
        });
      }else{
        this.constructionService.updateJobById(this.id,jobAdd,{ observe: 'response' }).subscribe({
          next: (response: HttpResponse<any>) => {
            console.log("Data update:", response);
    
            // Check if login is successful
            if (
              response.status === 200 &&
              response.body?.msg === 'login successfull' &&
              response.body?.Tokens
            ) {
              }
            }
          })
      }
      // Call the API
      
    } else {
      this.snackBar.open('Please fill out all required fields.', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
      });
    }
  }

  onFilesUploaded(files: File[]) {
    this.uploadedFiles = files;
    console.log('Uploaded Files:', this.uploadedFiles);
  }

  handleError(message: string) {
    if (message) {
      console.error('Error:', message);
    }
  }

  updateCrew(updatedCrew: string[]) {
    this.selectedCrew = updatedCrew;
    console.log('Updated Crew:', this.selectedCrew);
  }
  getidByJob() {
    
    this.constructionService.getJobById(this.id, { observe: 'response' }).subscribe(
      (response: HttpResponse<any>) => {
        if (response.status === 200 && response.ok) {
          // Save the response body (job details)
          const jobData = response.body;
          console.log('Job Data:', jobData);
          this.jobCustomer=jobData.customer;
          this.jobSupervisior=jobData.supervisor_name;
          this.startDate=jobData.start_date;
          this.endDate=jobData.end_date;
          this.jobWorkDone=jobData.work_done_percentage;
          this.jobOrderId=jobData.job_order_id;
          this.jobType=jobData.job_type;
          this.logForm.patchValue({
            workOrderId:jobData.job_order_id,
            workType:jobData.job_type,
            description: jobData.note,
          });
          // Example: Save to a variable (adjust as needed)
          this.savedJobData = jobData; // Make sure `savedJobData` is defined in the class
  
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
