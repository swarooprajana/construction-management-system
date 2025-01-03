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
import {  HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { ProfileComponent } from './home/profile/profile.component';
import { DashboardHomeComponent } from './home/dashboard-home/dashboard-home.component';
import { AllJobsComponent } from './home/all-jobs/all-jobs.component';
import { AddJobComponent } from './home/add-job/add-job.component';
import { CrewComponent } from './home/crew/crew.component';
import { SettingsComponent } from './home/settings/settings.component';
import { JobDetailsComponent } from './home/job-details/job-details.component';
import { CalenderComponent } from './home/calender/calender.component';
import { TableComponent } from './components/table/table.component';
import { DataPropertyGetterPipe } from './components/table/data-property-getter-pipe/data-property-getter.pipe';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HeadingComponent } from './components/heading/heading.component';
import { HeaderComponent } from './components/header/header.component';
import { NewRoleComponent } from './home/new-role/new-role.component';
import { ListComponent } from './components/list/list.component';
import { DialiesLogComponent } from './home/dialies-log/dialies-log.component';
import { EditJobComponent } from './popups/edit-job/edit-job.component';
import { CreateJobComponent } from './popups/create-job/create-job.component';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { CustomDateAdapter } from '../custom-date-adapter';
import { CUSTOM_DATE_FORMATS } from '../custom-date-format';
import { MultipleUploadComponent } from './components/multiple-upload/multiple-upload.component';
import { ChipsComponent } from './components/chips/chips.component';
import { CrewDetailsComponent } from './home/crew/crew-details/crew-details.component';
import { ImageInputComponent } from './components/image-input/image-input.component';
import { SpinnerComponent } from './components/spinner/spinner.component';


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
    DashboardComponent,
    ProfileComponent,
    DashboardHomeComponent,
    AllJobsComponent,
    AddJobComponent,
    CrewComponent,
    SettingsComponent,
    JobDetailsComponent,
    CalenderComponent,
    TableComponent,
    DataPropertyGetterPipe,
    HeadingComponent,
    HeaderComponent,
    NewRoleComponent,
    ListComponent,
    DialiesLogComponent,
    EditJobComponent,
    CreateJobComponent,
    MultipleUploadComponent,
    ChipsComponent,
    CrewDetailsComponent,
    ImageInputComponent,
    SpinnerComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
MatSortModule,
MatPaginatorModule,
MatButtonModule,
MatIconModule,
MatCheckboxModule,
MatMenuModule,
MatInputModule,
MatFormFieldModule,

    
  ],
  providers: [
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
