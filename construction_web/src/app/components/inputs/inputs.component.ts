import { Component, Input } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrl: './inputs.component.scss'
})
export class InputsComponent {
  @Input() borderRadius: string = '0';
  @Input() parentForm!: FormGroup;
  @Input() controlName!: string;
  @Input() label: string = '';
  @Input() type: string = '';
  @Input() placeholder: string = '';
  @Input() minLength: number = 0;
  @Input() validationMessages: { [key: string]: string } = {};
  @Input() required: boolean = false;
  @Input() icon: string | null = null;
  @Input() showBorders: boolean = false;
  showPassword: boolean = false;
  constructor() {}

  ngOnInit(): void {
    const control = this.parentForm.get(this.controlName);
  
    if (control) {
      const validators = [];
  
      if (this.required) {
        validators.push(Validators.required);
      }
  
      if (this.type === 'email') {
        validators.push(Validators.email);
      }
  
      if (this.minLength > 0) {
        validators.push(Validators.minLength(this.minLength));
      }
  
      control.setValidators(validators);
      control.updateValueAndValidity();
    }
  }

  showError(): boolean {
    const control = this.parentForm.get(this.controlName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  getErrorMessage(): string {
    const control = this.parentForm.get(this.controlName);
    if (control && control.errors) {
      if (control.errors['required']) {
        return this.validationMessages['required'] || 'This field is required.';
      } else if (control.errors['email']) {
        return this.validationMessages['email'] || 'Please enter a valid email address.';
      } else if (control.errors['minlength']) {
        return (
          this.validationMessages['minlength'] ||
          `Minimum length should be ${this.minLength}.`
        );
      }
    }
    return '';
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    this.type = this.showPassword ? 'text' : 'password';
  }
}
