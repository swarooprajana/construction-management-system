import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConstructionService } from '../../construction.service';

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

  }
}
