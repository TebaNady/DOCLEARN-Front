import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-choose-faculty',
  templateUrl: './choose-faculty.component.html',
  styleUrls: ['./choose-faculty.component.css']
})
export class ChooseFacultyComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  selectFaculty(faculty: string): void {
    if (faculty === 'BSU') {
      this.router.navigate(['/choose']);
    } else if (faculty === 'EELU') {
      this.router.navigate(['/choose']);
    }
  }

}
