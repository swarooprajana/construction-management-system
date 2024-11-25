import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConstructionService } from '../../construction.service';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrl: './create-job.component.scss'
})
export class CreateJobComponent {
  logForm!:FormGroup;
  loginErrorMessage: any;
  dateOfBirth:any;
  endDate:any;
  uploadedFiles: File[] = [];
  selectedCrew: string[] = ['Lela Widerman', 'Colin Von', 'Travis Jakubowski'];
  crewOptions: string[] = ['Lela Widerman', 'Colin Von', 'Travis Jakubowski', 'Alice Doe', 'John Smith'];
  constructor(private fb:FormBuilder,private router:Router,private snackBar: MatSnackBar,private constructionService:ConstructionService){

  }
  ngOnInit() {
    this.logForm = this.fb.group({
      workOrderName: ['', [Validators.required]], 
      workType: ['', [Validators.required]], // Wrap validators in an array
      startDate: ['', [Validators.required]],// Validators already wrapped correctly here
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
}
