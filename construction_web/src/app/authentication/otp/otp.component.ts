import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, Subject, Subscription, take, takeUntil } from 'rxjs';
import { ConstructionService } from '../../construction.service';
import { HttpResponse } from '@angular/common/http';
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
  hasImage?: boolean;
  imageUrl?: string;
  userid?: string;
  Password?: string;
}
@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.scss'
})
export class OtpComponent {
  @ViewChild('input1') input1!: ElementRef;
  @ViewChild('input2') input2!: ElementRef;
  @ViewChild('input3') input3!: ElementRef;
  @ViewChild('input4') input4!: ElementRef;

  showMobileIcon = false;
  displayName = 'userRegistration';
  formData: any = {
    studentFirstName: '',
    studentDOB: '',
    mothersFirstName: '',
    emailId: '',
  };
  verificationCode = '';
  otpValue: string[] = ['', '', '', ''];
  invalidDetailsMessage: any;
  successmsg: any;
  result: any;
  oneTime: any;
  hcid: any;
  resendButtonDisabled = false;
  countdownSeconds: number = 0;
  countdownInterval: any;
  otpSentMessage: any;
  otpExpired = false;
  showResendError = false;
  invalidDetailsMessages: any;
  mobile: any;

  userId: any;
  email: any;
  invalidOtp: any;
  tiles: Tile[] = [
    { text: '', cols: 2, rows: 1, color: '#FFFFFF', imageUrl: 'assets/images/svgs/doctor.svg', hasImage: true },
    { text: '', cols: 2, rows: 1, color: '#FFFFFF', userid: 'user1', Password: 'Password' },
  ];

  destroyed = new Subject<void>();
  currentScreenSize: any;
  studentForm!: FormGroup;
  username: any;
  timer = 0; // Timer in seconds
  isResendDisabled = false; // Button state
  timerSubscription: Subscription | null = null;
  private readonly TIMER_KEY = 'otp_timer_end';
  endTime: any;
  constructor(
    private routes: Router,
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
    private fb: FormBuilder,
    private renderer: Renderer2,
    private snackBar:MatSnackBar,
    private constructionService:ConstructionService
  ) {}

  ngOnInit() {
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(takeUntil(this.destroyed))
      .subscribe((result) => {
        this.showMobileIcon = result.breakpoints[Breakpoints.XSmall] || result.breakpoints[Breakpoints.Small];
      });
       this.endTime = localStorage.getItem(this.TIMER_KEY);
      if(!this.endTime){
        this.startCountdown(180);
      }
      
      this.restoreTimer();
      this.route.queryParams.subscribe(params => {
        this.username = params['username'];
        console.log('Username received:', this.username);
      });
    }

    // this.studentForm = this.fb.group({
    //   Email: ['', [Validators.required]],
    // });
  

  onOtpInputChange(index: number, nextInput: HTMLInputElement | null, prevInput: HTMLInputElement | null): void {
    this.otpValue[index] = this.otpValue[index].replace(/[^0-9]/g, '');
    if (this.otpValue[index] === '' && prevInput) {
      prevInput.focus();
    } else if (this.otpValue[index] !== '' && nextInput) {
      nextInput.focus();
    }
  }

  onKeyDown(event: KeyboardEvent, prevInput: HTMLInputElement | null, nextInput: HTMLInputElement | null): void {
    if (event.key === 'ArrowLeft' && prevInput) {
      prevInput.focus();
    } else if (event.key === 'ArrowRight' && nextInput) {
      nextInput.focus();
    }
  }

  resetOtpValues() {
    this.otpValue = ['', '', '', ''];
  }

  dashboard() {
    this.routes.navigate(['./dashboard']);
  }

 

  closeErrorMessage() {
    this.showResendError = false;
  }
  startCountdown(duration: number): void {
    const endTime = Date.now() + duration * 1000; // Calculate the end time in milliseconds
    localStorage.setItem(this.TIMER_KEY, endTime.toString()); // Store end time in localStorage

    this.countdownSeconds = duration;
    this.resendButtonDisabled = true;

    this.timerSubscription = interval(1000)
      .pipe(take(duration))
      .subscribe({
        next: () => {
          this.countdownSeconds--;
        },
        complete: () => {
          this.resendButtonDisabled = false;
          this.timerSubscription = null;
          this.otpExpired = true; // Mark OTP as expired after the timer ends
          localStorage.removeItem(this.TIMER_KEY); // Clear the timer state
        }
      });
  }

  restoreTimer(): void {
    const endTime = localStorage.getItem(this.TIMER_KEY);
    if (endTime) {
      const remainingTime = Math.ceil((+endTime - Date.now()) / 1000);
      if (remainingTime > 0) {
        this.startCountdown(remainingTime); // Resume the timer with remaining time
      } else {
        localStorage.removeItem(this.TIMER_KEY); // Clear expired timer
      }
    }
  }


  formatCountdownTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`; // Format as MM:SS
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  otpSubmit() {
    const otpData = {
      email: this.username,
      otp: this.otpValue.join(''), // Combine OTP digits into a single string
    };
  
    console.log('OTP Data:', otpData);
  
    this.constructionService.otpVerify(otpData, { observe: 'response' }).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.status === 200) {
          // Success Snackbar
          this.snackBar.open('OTP Verified', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['success-snackbar'],
          });
          // Navigate to new password page
          this.routes.navigate(['newpassword']);
          localStorage.removeItem(this.TIMER_KEY);
        }
      },
      error: (err) => {
        // Log the error for debugging
        console.error('Error during OTP verification:', err);
  
        // Determine appropriate error message
        const errorMessage = 
          err.error?.message || 
          'Failed to verify OTP. Please try again.';
  
        // Display error snackbar
        this.snackBar.open(errorMessage, 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['error-snackbar'],
        });
      },
      complete: () => {
        console.log('OTP verification request completed.');
      },
    });
  }
  
  resendOtp(): void {
    const formData = {
      email: this.username,
    };
  
    console.log('Resending OTP with data:', formData);
  
    this.constructionService.sendOtp(formData, { observe: 'response' }).subscribe({
      next: (response:  HttpResponse<any>) => {
        if (response.status === 200) {
        this.startCountdown(180); // 3 minutes
        this.otpSentMessage = 'A new OTP has been sent.';
        this.otpExpired = false;
  
        console.log('OTP resent successfully!');
  
        // Display success snackbar
        this.snackBar.open('OTP Sent Successfully!', 'Close', {
          duration: 3000, // duration in milliseconds
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['success-snackbar'],
        });
      }
    },
    
      error: (err) => {
        // Log the error for debugging
        console.error('Error during OTP resend:', err);
  
        // Determine appropriate error message
        const errorMessage =
          err.error?.message || 'Failed to resend OTP. Please try again later.';
  
        // Display error snackbar
        this.snackBar.open(errorMessage, 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['error-snackbar'],
        });
      },
      complete: () => {
        console.log('OTP resend request completed.');
      },
    });
  }
  
  
 



}
