import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConstructionService {
  private sharedData: any;
  private callFunctionSource = new Subject<void>();
  callFunction$ = this.callFunctionSource.asObservable();
  getUserData: any;

  url = "http://35.174.156.124:8000/";

  constructor(private http: HttpClient, private routes: Router) {
    console.log(this.getRequestOptions(),"aa");
  }

  // Function to trigger an event for refresh
  callFunction() {
    this.callFunctionSource.next();
  }

  // Method to generate dynamic headers with the latest token
  private getHttpHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken') || '';
    return new HttpHeaders({
      Accept: 'application/json, */*, text/html',
      Authorization: `Bearer ${token}`,
    });
  }

  // Dynamic request options for APIs
  private getRequestOptions() {
    return { headers: this.getHttpHeaders() ,
      
    };
    
  }
  
  private getMultipartRequestOptions() {
    return {
      headers: new HttpHeaders({
        Accept: 'multipart/form-data, */*, text/html',
        Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
      }),
    };
  }

  // API methods
  login(loginObj: any, options: { observe: 'response' }): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(`${this.url}login/`, loginObj, options);
  }

  sendOtp(emailObj: any, options: { observe: 'response' }): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(`${this.url}send_otp/`, emailObj, options);
  }

  otpVerify(otpObj: any, options: { observe: 'response' }): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(`${this.url}confirm_otp/`, otpObj, options);
  }

  newPassword(newObj: any, options: { observe: 'response' }): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(`${this.url}reset_password/`, newObj, options);
  }

  getAllCrew(): Observable<any> {
    return this.http.get(`${this.url}crew/`, this.getRequestOptions());
  }
  getAllJobs(){
    return this.http.get(`${this.url}jobs/`, this.getRequestOptions());
  }
  createJob(jobData:any,options: { observe: 'response' }): Observable<HttpResponse<any>>{
    const requestOptions = {
      ...this.getRequestOptions(),
      ...options, // Merge additional options
    };
    return this.http.post<HttpResponse<any>>(`${this.url}jobs/`, jobData, requestOptions);
    
} 

getJobById(id: any,options: { observe: 'response' } = { observe: 'response' }): Observable<HttpResponse<any>> {

  const requestOptions = {
    ...this.getRequestOptions(),
    ...options, // Merge additional options
  };

  return this.http.get<HttpResponse<any>>(`${this.url}job/${id}/`, requestOptions);
}
updateJobById(id:any,jobData:any,options: { observe: 'response' }): Observable<HttpResponse<any>> {
  const requestOptions = {
    ...this.getRequestOptions(),
    ...options, // Merge additional options
  };
  return this.http.put<HttpResponse<any>>(`${this.url}job/${id}/`, jobData, requestOptions);
}
deleteJobById(id:any,options: { observe: 'response' }): Observable<HttpResponse<any>> {
  const requestOptions = {
    ...this.getRequestOptions(),
    ...options, // Merge additional options
  };
  return this.http.delete<HttpResponse<any>>(`${this.url}job/`+id+`/`, requestOptions);
}
getDailiesHistory(){
  return this.http.get(`${this.url}all_job_progress/`, this.getRequestOptions());
}
getByIdCrew(id:any,options: { observe: 'response' } = { observe: 'response' }): Observable<HttpResponse<any>> {

  const requestOptions = {
    ...this.getRequestOptions(),
    ...options, // Merge additional options
  };

  return this.http.get<HttpResponse<any>>(`${this.url}crew/${id}/`, requestOptions);
}

registrationNewRole(regObj:any,options: { observe: 'response' }): Observable<HttpResponse<any>>{
  const requestOptions = {
    ...this.getRequestOptions(),
    ...options, // Merge additional options
  };
  return this.http.post<HttpResponse<any>>(`${this.url}registration/`, regObj, requestOptions);

}
getProfile(options: { observe: 'response' }): Observable<HttpResponse<any>>{
  const requestOptions = {
    ...this.getRequestOptions(),
    ...options, // Merge additional options
  };
  return this.http.get<HttpResponse<any>>(`${this.url}viewprofile/`,requestOptions);
}
getAllActiveCrew(){
  return this.http.get(`${this.url}crew/`, this.getRequestOptions())
}
updateCrewByCrewId(id:any,crewData:any,options: { observe: 'response' }): Observable<HttpResponse<any>> {
  const requestOptions = {
    ...this.getRequestOptions(),
    ...options, // Merge additional options
  };
  return this.http.put<HttpResponse<any>>(`${this.url}crew/${id}/`,crewData, requestOptions);
}
postCrew(CreewObj:any,options: { observe: 'response' }): Observable<HttpResponse<any>>{
  const requestOptions = {
    ...this.getRequestOptions(),
    ...options, // Merge additional options
  };
  return this.http.post<HttpResponse<any>>(`${this.url}crew/`,CreewObj, requestOptions);
}
deleteCrewById(id:any,options: { observe: 'response' }): Observable<HttpResponse<any>> {
  const requestOptions = {
    ...this.getRequestOptions(),
    ...options, // Merge additional options
  };
  return this.http.delete<HttpResponse<any>>(`${this.url}crew/${id}/`,requestOptions);
}
}