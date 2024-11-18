import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { OtpComponent } from './authentication/otp/otp.component';
import { ResetPwdComponent } from './authentication/reset-pwd/reset-pwd.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { DashboardHomeComponent } from './home/dashboard-home/dashboard-home.component';
import { AllJobsComponent } from './home/all-jobs/all-jobs.component';
import { AddJobComponent } from './home/add-job/add-job.component';
import { JobDetailsComponent } from './home/job-details/job-details.component';
import { CalenderComponent } from './home/calender/calender.component';

const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"",pathMatch:"full",redirectTo:"login"},
  {path:"otp",component:OtpComponent},
  {path:"resetpassword",component:ResetPwdComponent},
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', component: DashboardHomeComponent }, // Default child route
      { path: 'alljobs', component: AllJobsComponent },
      { path: 'addjobs', component: AddJobComponent },
      {path:"calender",component:CalenderComponent},
      {path:"jobdetails",component:JobDetailsComponent}
      // Add more child routes as needed
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
