import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConstructionService } from '../../construction.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.scss'
})
export class NewPasswordComponent {
  logForm!:FormGroup;

  constructor(private fb:FormBuilder,private router:Router,private snackBar: MatSnackBar,private construction:ConstructionService){

  }
  ngOnInit(){
    this.logForm = this.fb.group({
      username:['', Validators.required],
      newpassword:['', Validators.required],
      confirmPassword: ['', [Validators.required]]
    });
  }
  onSubmit() {
    if (this.logForm.valid) {
      const formData = {
        email: this.logForm.value.username,
        password: this.logForm.value.password,
      };
  
      console.log('Form data:', formData);
  
      this.construction.login(formData, { observe: 'response' }).subscribe({
        next: (response: HttpResponse<any>) => {
          // Check if login is successful (status code 200)
          if (response.status === 200 && response.body && response.body.msg === 'login successfull' && response.body.Tokens) {
            // Store tokens in localStorage/sessionStorage (optional)
            localStorage.setItem('accessToken', response.body.Tokens.access);
            localStorage.setItem('refreshToken', response.body.Tokens.refresh);
  
            // Display success message
            this.snackBar.open('Login successful!', 'Close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: ['success-snackbar'],
            });
  
            // Navigate to dashboard
            this.router.navigate(['dashboard']);
            console.log('Login success:', response.body);
          } else {
            // Handle unexpected response structure or failed login
            this.snackBar.open('Login failed! Invalid response.', 'Close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: ['error-snackbar'],
            });
          }
        },
        error: (err) => {
          // Handle errors
          console.error('Error:', err);
          const errorMessage = err.error?.message || 'Login failed! Please try again later.';
          this.snackBar.open(errorMessage, 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['error-snackbar'],
          });
        },
      });
    } else {
      // If form is invalid, show validation error
      this.snackBar.open('Please fill in all required fields correctly.', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['error-snackbar'],
      });
      this.logForm.markAllAsTouched(); // Mark all fields as touched to show validation errors
    }
  }
  
  
  
  
}
