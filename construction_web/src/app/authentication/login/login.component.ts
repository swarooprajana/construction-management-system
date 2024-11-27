import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConstructionService } from '../../construction.service';
import { HttpErrorResponse } from '@angular/common/http';

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
  
      this.constructionService.login(formData).subscribe(
        (data: any) => {
          console.log("Login response:", data);
          
          // Check if login is successful
          if (data && data.msg === 'login successfull' && data.Tokens) {
            // Store tokens in localStorage/sessionStorage (optional)
            localStorage.setItem('accessToken', data.Tokens.access);
            localStorage.setItem('refreshToken', data.Tokens.refresh);
  
            // Display success message
            this.snackBar.open('Login successful!', 'Close', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: ['success-snackbar']
            });
  
            // Navigate to dashboard
            this.router.navigate(["dashboard"]);
            console.log(data, "Login success!");
          } else {
            // Handle unexpected response structure
            this.snackBar.open('Login failed! Invalid response.', 'Close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: ['error-snackbar']
            });
          }
        },
        (error: HttpErrorResponse) => {
          if (error.error && error.error.Message) {
            this.loginErrorMessage = error.error.Message;
          } else {
            this.loginErrorMessage = error.message;
          }
          
          // Display error message
          this.snackBar.open(this.loginErrorMessage || 'Login failed!', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['error-snackbar']
          });
  
          console.log(this.loginErrorMessage, "Error message");
        }
      );
    } else {
      // Mark all fields as touched to show validation errors
      this.logForm.markAllAsTouched();
      this.snackBar.open('Invalid login!', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });
    }
  }
forgot(){
  this.router.navigate(["/resetpassword"])
}
}
