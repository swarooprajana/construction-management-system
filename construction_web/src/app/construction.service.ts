import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConstructionService {
  private sharedData: any;
  private callFunctionSource = new Subject<void>();
  callFunction$ = this.callFunctionSource.asObservable();
  getUserData: any;
  // login: any;
  
  triggerRefresh: any;
  private loggedInKey = 'isLoggedIn';
  
  url="http://35.174.156.124:8000/";
  token=''

  callFunction(){
    this.callFunctionSource.next();
  }

  loginValue= false;

  httpHeaders=new HttpHeaders({'Accept': 'application/json,  */*, text/html' ,

  // 'Authorization': `Bearer ${this.token}`

  })
  constructor(private http:HttpClient,private routes:Router) {
  }

  requestOptions = {headers:this.httpHeaders};
  requestMultiPartOptions = {headers:new HttpHeaders({'Accept': 'multipart/form-data,  */*, text/html' ,

  'Authorization': `Bearer ${this.token}`

  })};

  login(loginObj:any){
    return this.http.post(this.url+"login/",loginObj);
  }
  sendOtp(emailObj:any){
    return this.http.post(this.url+"send_otp/",emailObj);
  }
  otpVerify(otpObj:any){
    return this.http.post(this.url+"confirm_otp/",otpObj)
  }
}
