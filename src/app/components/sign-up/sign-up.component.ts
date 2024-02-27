import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Route, Router } from '@angular/router';

export function threeSeparateNamesValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const name = control.value;
    const names = name.split(' ').filter(Boolean); // Split the name into separate names

    if (names.length < 3) {
      return { 'threeSeparateNames': true }; // Return an error if there are less than three separate names
    }
    
    return null; // Return null if the validation passes
  };
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  registerForm!: FormGroup;
  isLoading: boolean = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*'), threeSeparateNamesValidator()]],
      id: ['', [Validators.required, Validators.pattern(/^\d{14}$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      year: ['', Validators.required],
      university: ['', Validators.required],
      faculty: ['', Validators.required]
    });
  }

  submitError: string = '';

onSubmit(): void {
  if (this.registerForm.valid) {
    this.isLoading = true;
    this.http.post<any>('http://localhost:4000/signup', this.registerForm.value)
      .subscribe(
        (response) => {
          console.log('Signup successful:', response);
          // You can navigate to another page or show a success message here
          this.router.navigateByUrl('/login');
        },
        (error) => {
          console.error('Signup error:', error);
          this.isLoading = false;
          if (error.status === 409) {
            this.submitError = 'ID is already in use. Please choose a different one.';
          } else {
            this.submitError = 'Error occurred while signing up. Please try again later.';
          }
          
          // Handle other error responses as needed
        }
      );
  } else {
    this.submitError = ('Form is invalid. Please fill in all required fields correctly.');
  }
}
  agreeToTerms: boolean = false;
}
