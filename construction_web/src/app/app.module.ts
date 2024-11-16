import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './authentication/login/login.component';
import { ButtonComponent } from './components/button/button.component';
import { MaterialModule } from './material/material.module';
import { InputsComponent } from './components/inputs/inputs.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { StatusCardComponent } from './components/status-card/status-card.component';
import { CircularProgressionComponent } from './components/circular-progression/circular-progression.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OtpComponent } from './authentication/otp/otp.component';
import { ResetPwdComponent } from './authentication/reset-pwd/reset-pwd.component';
import { NewPasswordComponent } from './authentication/new-password/new-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ButtonComponent,
    InputsComponent,
    SidebarComponent,
    StatusCardComponent,
    CircularProgressionComponent,
    PieChartComponent,
    OtpComponent,
    ResetPwdComponent,
    NewPasswordComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    FormsModule
    
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
