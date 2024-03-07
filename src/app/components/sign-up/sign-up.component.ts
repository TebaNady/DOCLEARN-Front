import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  registerForm: FormGroup;
  submitError!: string;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {
    this.registerForm = this.formBuilder.group({
      id: ['', [Validators.required, Validators.pattern(/^\d{14}$/)]],
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      year: ['', Validators.required],
      university: ['', Validators.required],
      faculty: ['', Validators.required],
      checked: [false, Validators.requiredTrue] // Add the checked property and set initial value
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      // Proceed with form submission
      this.submitError = '';

      const formData = this.registerForm.value;

      this.http.post<any>('http://localhost:4000/signUp', formData)
        .subscribe(
          (response) => {
            console.log('Signup successful:', response);
            // Handle successful signup (e.g., redirect user to login page)
            this.router.navigateByUrl('/login');
          },
          (error) => {
            console.error('Signup failed:', error);
            if (error.status === 409) {
              this.submitError = 'ID is already in use. Please choose a different one.';
            } else {
              this.submitError = 'Error occurred while signing up. Please try again later.';
            }
          }
        );
    } else {
      // Form is invalid, inspect the errors for each form control
      Object.keys(this.registerForm.controls).forEach(field => {
        const control = this.registerForm.get(field);
        if (control instanceof FormControl) {
          console.log(`Validation errors for ${field}:`, control.errors);
        }
      });
      const checkedControl = this.registerForm.get('checked');
      if (checkedControl && checkedControl.errors && checkedControl.errors['required']) {
        this.submitError = 'Please agree to the terms and conditions.';
      } else {
        this.submitError = 'Please fill out the form correctly.';
      }
    }
  }
}

