import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

// Custom validator function to check if the name consists of at least three separate names
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

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      id: ['', [Validators.required, Validators.pattern(/^\d{14}$/)]], // Apply the regular expression pattern directly
      username: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*'), threeSeparateNamesValidator()]], // Apply the custom validator
      password: ['', [Validators.required, Validators.minLength(8)]],
      year: ['', [Validators.required]]
    });
  }
  

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log('Form submitted:', this.registerForm.value);
    } else {
      console.log('Form is invalid. Please fill in all required fields correctly.');
    }
  }

}
