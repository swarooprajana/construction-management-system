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
      // Type: this.logForm.value.type
    };

    console.log(formData);

    this.constructionService.login(formData).subscribe(
      (data: any) => {
        if (data['Status'] === 200) {
          this.snackBar.open('Login successful!', 'Close', {
                    // duration: 3000, // duration in milliseconds
                    horizontalPosition: 'center',
                    verticalPosition: 'top',
                    panelClass: ['success-snackbar']
                  });
                this.router.navigate(["dashboard"]);
          console.log(data, "success");
        }
      },
      (error: HttpErrorResponse) => {
        if (error.error && error.error.Message) {
          this.loginErrorMessage = error.error.Message;
        } else {
          this.loginErrorMessage = error.message;
        }
        console.log(this.loginErrorMessage, "message");
      }
    );
  } else {
    this.logForm.markAllAsTouched(); 
    this.snackBar.open('Invalid login !', 'Close', {
      duration: 3000, // duration in milliseconds
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
