import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConstructionService } from '../../construction.service';
import { HttpResponse } from '@angular/common/http';
import {Location} from '@angular/common';
@Component({
  selector: 'app-reset-pwd',
  templateUrl: './reset-pwd.component.html',
  styleUrl: './reset-pwd.component.scss'
})
export class ResetPwdComponent {
  logForm!:FormGroup;

  constructor(private fb:FormBuilder,private router:Router,private snackBar: MatSnackBar,private constructionService:ConstructionService,private _location: Location){

  }
  ngOnInit(){
    this.logForm = this.fb.group({
      username:['', Validators.required],
      // password: ['', [Validators.required]]
    });
  }
  onSubmit() {
    if (this.logForm.valid) {
      const formData = {
        email: this.logForm.value.username,
        
      };
      console.log(formData);
     this.constructionService.sendOtp(formData, { observe: 'response' }).subscribe({
      next: (response:  HttpResponse<any>) => {
      if (response.status === 200) {
      this.snackBar.open('OTP Sent!', 'Close', {
        duration: 3000, // duration in milliseconds
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['success-snackbar']
      });
      const username = this.logForm.value.username;
      this.router.navigate(['otp'], { queryParams: { username } });
     
    }
  },
  error: (err) => {
    // Log the error for debugging
    console.error('Error during OTP resend:', err);

    // Determine appropriate error message
    const errorMessage =
      err.error?.message || 'Failed to resend OTP. Please try again later.';

    // Display error snackbar
    this.snackBar.open(errorMessage, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['error-snackbar'],
    });
  },
  complete: () => {
    console.log('OTP resend request completed.');
  },
  })
  }
  }
  back(){
    this._location.back();
  }
}

