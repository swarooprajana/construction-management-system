import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { OtpComponent } from './authentication/otp/otp.component';
import { ResetPwdComponent } from './authentication/reset-pwd/reset-pwd.component';

const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"",pathMatch:"full",redirectTo:"login"},
  {path:"otp",component:OtpComponent},
  {path:"resetpassword",component:ResetPwdComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
