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
  crewData: any;
  cId: any;

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
      availability: [null, Validators.required],
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
    if(this.logForm.valid){
      
      const crewData = {
        id:this.cId,
        name:this.logForm.value.username,
        crew_id:this.crewid,
        is_available:this.logForm.value.availability,
      };
      const postCrew={
        name:this.logForm.value.username,
        is_available:this.logForm.value.availability,
      }
      console.log(crewData,"crewdetails",postCrew);
      if(!this.cId){
        this.constructionService.postCrew(postCrew, { observe: 'response' }).subscribe({
          next: (response: HttpResponse<any>) => {
            console.log("crewPost:", response);
    
            // Check if login is successful
            if (
              response.status === 201
            ) {
              this.snackBar.open('Crew created successfully!', 'Close', {
                duration: 3000,
                verticalPosition: 'top',
              });
              this.dialogRef.close();
              
            }
          },
          error: (err) => {
            console.error('Error:', err);
            this.snackBar.open('Failed to create the Crew. Please try again.', 'Close', {
              duration: 3000,
              verticalPosition: 'top',
            });
          },
        });
      }else{
        this.constructionService.updateCrewByCrewId(this.crewid,crewData,{ observe: 'response' }).subscribe({
          next: (response: HttpResponse<any>) => {
            console.log("crew update:", response);
    
            // Check if login is successful
            if (
              response.status === 200               
            ) {
              this.snackBar.open('Crew Updated successfully!', 'Close', {
                duration: 3000,
                verticalPosition: 'top',
              });
              this.dialogRef.close();
              }
            }
          })
      }
      // Call the API
      
    } else {
      this.logForm.markAllAsTouched();
      this.snackBar.open('Please fill in all required fields.', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['error-snackbar'],
      });
    }
  
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
          this.crewData = response.body;
          console.log("crewdata", this.crewData);
          this.cId=this.crewData.id;
          this.logForm.patchValue({
            username:this.crewData.name,
            availability:this.crewData.is_available,  
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
