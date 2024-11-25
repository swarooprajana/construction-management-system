import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  uploadFileUrl: any;
  uploadFile: any;
  logForm!:FormGroup

  constructor(private fb:FormBuilder){

  }
  ngOnInit(){
    this.logForm = this.fb.group({
      name: ['', [Validators.required]], 
      designation: ['', [Validators.required]], // Wrap validators in an array
    });
  
  }
  handleFileSelected(event: any) {

    const file:File=event.target.files[0];
    console.log('Selected file:', file);
    this.uploadFile = file;

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.uploadFileUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      this.uploadFileUrl = null; 
    }
  }
  onSubmit(){

  }
}
