import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConstructionService } from '../../construction.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  logForm!:FormGroup;
  loginErrorMessage: any;

  constructor(private fb:FormBuilder,private router:Router,private snackBar: MatSnackBar,private constructionService:ConstructionService){

  }
  ngOnInit() {
    this.logForm = this.fb.group({
      username: ['', [Validators.required,Validators.email]], // Wrap validators in an array
      password: ['', [Validators.required]] // Validators already wrapped correctly here
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

  onSubmit() {
    if (this.logForm.valid) {
      const formData = {
        email: this.logForm.value.username,
        password: this.logForm.value.password,
      };
  
      console.log(formData);
  
      // Pass both `formData` and the `options` object
      this.constructionService.login(formData, { observe: 'response' }).subscribe({
        next: (response: HttpResponse<any>) => {
          console.log("Login response:", response);
  
          // Check if login is successful
          if (
            response.status === 200 &&
            response.body?.msg === 'login successfull' &&
            response.body?.Tokens
          ) {
            // Store tokens in localStorage/sessionStorage
            localStorage.setItem('accessToken', response.body.Tokens.access);
            localStorage.setItem('refreshToken', response.body.Tokens.refresh);
  
            // Display success message
            this.snackBar.open('Login successful!', 'Close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: ['success-snackbar'],
            });
  
            // Navigate to the dashboard
            this.router.navigate(['dashboard']);
          } else {
            // Handle unexpected response structure
            this.snackBar.open('Login failed! Invalid response.', 'Close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: ['error-snackbar'],
            });
          }
        },
        error: (error: HttpErrorResponse) => {
          const errorMessage =
            error.error?.message || 'Login failed! Please try again.';
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
  
forgot(){
  this.router.navigate(["/resetpassword"])
}
}
