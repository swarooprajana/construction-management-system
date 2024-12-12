import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConstructionService } from '../../construction.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  uploadFileUrl: any;
  uploadFile: any;
  logForm!:FormGroup

  constructor(private fb:FormBuilder,private construction:ConstructionService){

  }
  ngOnInit(){
    this.logForm = this.fb.group({
      name: ['', [Validators.required]], 
      designation: ['', [Validators.required]], // Wrap validators in an array
    });
    this.getProfileCms();
  }
  handleFileSelected(event: any) {

    const file:File=event.target.files[0];
    console.log('Selected file:', file);
    this.uploadFile = file;

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.uploadFileUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      this.uploadFileUrl = null; 
    }
  }
  onSubmit(){

  }

  getProfileCms(){
    this.construction.getProfile({ observe: 'response' }).subscribe(
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
