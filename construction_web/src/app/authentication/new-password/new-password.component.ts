import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.scss'
})
export class NewPasswordComponent {
  logForm!:FormGroup;

  constructor(private fb:FormBuilder,private router:Router,private snackBar: MatSnackBar){

  }
  ngOnInit(){
    this.logForm = this.fb.group({
      newpassword:['', Validators.required],
      confirmPassword: ['', [Validators.required]]
    });
  }
  onSubmit() {
    if (this.logForm.valid) {
      const loginSuccessful = true; // Replace this with actual login logic

      if (loginSuccessful) {
        // Display the success snackbar message
        this.snackBar.open('Login successful!', 'Close', {
          duration: 3000, // duration in milliseconds
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        });
      this.router.navigate(["otp"]);
      console.log('Form Submitted', this.logForm.value);
      // Here, add your login logic or authentication service call
    }
  }
}
}
