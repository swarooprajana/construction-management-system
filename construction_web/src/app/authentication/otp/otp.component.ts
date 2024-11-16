import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
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

  constructor(
    private routes: Router,
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
    private fb: FormBuilder,
    private renderer: Renderer2,
    private snackBar:MatSnackBar
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

    this.route.queryParams.subscribe((params) => {
      this.email = params['email'];
      console.log(this.email, 'email');
    });

    this.studentForm = this.fb.group({
      Email: ['', [Validators.required]],
    });
  }

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

  startCountdown() {
    this.countdownSeconds = 10;
    clearInterval(this.countdownInterval);
    this.countdownInterval = setInterval(() => {
      if (this.countdownSeconds > 0) {
        this.countdownSeconds--;
      } else {
        this.resendButtonDisabled = false;
        clearInterval(this.countdownInterval);
      }
    }, 1000);
  }

  closeErrorMessage() {
    this.showResendError = false;
  }

  formatCountdownTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  otpSubmit() {
    const otpData = {
      Email: this.email,
      Otp: this.otpValue.join(''),
    };
    console.log(otpData, 'data');
    this.snackBar.open('otp verified', 'Close', {
      duration: 3000, // duration in milliseconds
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
    this.routes.navigate(["/confirmpassword"]);
  }
}
