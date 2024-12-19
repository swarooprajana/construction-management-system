import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConstructionService } from '../../construction.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-new-role',
  templateUrl: './new-role.component.html',
  styleUrl: './new-role.component.scss'
})
export class NewRoleComponent {
  logForm!:FormGroup;
  loginErrorMessage: any;

  constructor(private fb:FormBuilder,private router:Router,private snackBar: MatSnackBar,private constructionService:ConstructionService){

  }
  ngOnInit() {
    this.logForm = this.fb.group({
      username: ['', [Validators.required]], // Wrap validators in an array
      phone: ['', [Validators.required]],// Validators already wrapped correctly here
      email:['', [Validators.required,Validators.email]],
      password:['', [Validators.required]],
      cpassword:['', [Validators.required]],
      role:['', [Validators.required]]
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
   
    if (this.logForm.valid) {
      const regRole={
        email:this.logForm.value.email, 
    	  name:this.logForm.value.username, 
    	  password:this.logForm.value.password, 
        password2:this.logForm.value.cpassword, 
        role:this.logForm.value.role, 
      }
      console.log(regRole);
      this.constructionService.registrationNewRole(regRole, { observe: 'response' }).subscribe({
        next: (response: HttpResponse<any>) => {
          console.log("NewRole:", response);
  
          // Check if login is successful
          if (
            response.status === 200    
          ) {
            
  
            // Display success message
            this.snackBar.open('Role Created Succesfully!', 'Close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: ['success-snackbar'],
            });
          } else {
            // Handle unexpected response structure
            this.snackBar.open('Role Creation is Unsuccessful!.', 'Close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: ['error-snackbar'],
            });
          }
        },
        error: (error: HttpErrorResponse) => {
          const errorMessage =
            error.error?.message || 'Role Creation is Unsuccessful! Please try again.';
          this.snackBar.open(errorMessage, 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['error-snackbar'],
          });
  
          console.error('Error:', error);
        },
      });
    } else {
      // Mark all fields as touched to show validation errors
      this.logForm.markAllAsTouched();
      this.snackBar.open('Please fill in all required fields.', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['error-snackbar'],
      });
    }
  }

  
}
