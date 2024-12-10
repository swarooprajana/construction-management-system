import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConstructionService } from '../../construction.service';
import { HttpResponse } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrl: './edit-job.component.scss'
})
export class EditJobComponent {
  form: FormGroup;
  id: any;
  savedJobData: any;
  jobCustomer: any;
  jobSupervisior: any;
  jobStartDate: any;
  jobEndDate: any;
  jobWorkDone: any;
  jobNote: any;
  jobType: any;
  jobOrderId: any;

  constructor(private fb: FormBuilder,private constructionService:ConstructionService,  @Inject(MAT_DIALOG_DATA) public data: any,
  private dialogRef: MatDialogRef<EditJobComponent>) {
    this.form = this.fb.group({
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(500),
        ],
      ],
    });
    console.log("Received Data in Dialog:", data);
    this.id=data.id;
    console.log(this.id);
  }
  ngOnInit(){
    this.getidByJob();
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form Submitted:', this.form.value);
    }
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
          this.jobStartDate=jobData.start_date;
          this.jobEndDate=jobData.end_date;
          this.jobWorkDone=jobData.work_done_percentage;
          this.jobOrderId=jobData.job_order_id;
          this.jobType=jobData.job_type;
          this.form.patchValue({
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
