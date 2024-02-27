import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = 'http://localhost:4000'; // Replace with your Node.js server URL

  constructor(private http: HttpClient) { }

  initiatePayment(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/initiatePayment`, {});
  }
}