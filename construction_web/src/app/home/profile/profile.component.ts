import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConstructionService } from '../../construction.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  uploadFileUrl: any;
  uploadFile: any;
  logForm!:FormGroup

  constructor(private fb:FormBuilder,private construction:ConstructionService){

  }
  ngOnInit(){
    this.logForm = this.fb.group({
      name: ['', [Validators.required]], 
      designation: ['', [Validators.required]],
       // Wrap validators in an array
       address: [
        '',
        [Validators.required, Validators.minLength(10), Validators.maxLength(500)],
      ],
      email: ['', [Validators.required,Validators.email]],
      mobile: ['', [Validators.required]],
    });
    this.getProfileCms();
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
    if(this.logForm.valid){

    }
    else{
      this.logForm.markAllAsTouched();
    }
  }
  getProfileCms(){
    this.construction.getProfile({ observe: 'response' }).subscribe(
      (response: HttpResponse<any>) => {
        if (response.status === 201 && response.ok) {
          // Save the response body (job details)
          const crewData = response.body;
          console.log("profile", crewData);
          this.logForm.patchValue({
            name:crewData.name,
            designation:crewData.role,
            address:crewData.address,
            email:crewData.email,
            mobile:crewData.phone_number
          });
          
        } else {
          console.error('Unexpected response status:', response.status);
        }
      },
      (error) => {
        console.error('Failed to fetch job details:', error);
      }
    );
  }
}
