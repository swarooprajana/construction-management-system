import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConstructionService } from '../../construction.service';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.scss'],
})
export class CreateJobComponent implements OnInit {
  logForm!: FormGroup;
  uploadedFiles: File[] = [];
  selectedCrew: string[] = [];
  crewOptions: string[] = ['Lela Widerman', 'Colin Von', 'Travis Jakubowski', 'Alice Doe', 'John Smith'];
  startDate: any;
  endDate:any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private constructionService: ConstructionService
  ) {}

  ngOnInit() {
    this.logForm = this.fb.group({
      workOrderId: ['', Validators.required],
      workType: ['', Validators.required],
     
      description: [
        '',
        [Validators.required, Validators.minLength(10), Validators.maxLength(500)],
      ],
      
    });
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

      // Call the API
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
}
