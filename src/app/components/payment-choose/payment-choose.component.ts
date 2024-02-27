import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-choose',
  templateUrl: './payment-choose.component.html',
  styleUrls: ['./payment-choose.component.css']
})
export class PaymentChooseComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  navigateToExam(): void {
    this.router.navigate(['/choose']); // Assuming 'exam' is the route name for the exam page
  }

}
