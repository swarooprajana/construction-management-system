import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConstructionService } from '../../construction.service';

@Component({
  selector: 'app-reset-pwd',
  templateUrl: './reset-pwd.component.html',
  styleUrl: './reset-pwd.component.scss'
})
export class ResetPwdComponent {
  logForm!:FormGroup;

  constructor(private fb:FormBuilder,private router:Router,private snackBar: MatSnackBar,private constructionService:ConstructionService){

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
     this.constructionService.sendOtp(formData).subscribe((data:any)=>{
      this.snackBar.open('OTP Sent!', 'Close', {
        duration: 3000, // duration in milliseconds
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['success-snackbar']
      });
      const username = this.logForm.value.username;
      this.router.navigate(['otp'], { queryParams: { username } });
     })
        
    
  }
}
}
