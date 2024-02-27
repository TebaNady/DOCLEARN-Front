import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  apiURL = "http://localhost:4000/questions";
  constructor(private http: HttpClient) {}

  getAllQuestions() {
    return this.http.get(this.apiURL)
  }

}
