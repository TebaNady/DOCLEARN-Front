import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-exam',
  templateUrl: './choose-exam.component.html',
  styleUrls: ['./choose-exam.component.css']
})
export class ChooseExamComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  navigateToExam(): void {
    this.router.navigate(['/examType']); // Assuming 'exam' is the route name for the exam page
  }
}
