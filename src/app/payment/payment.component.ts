// import { Component, OnInit } from '@angular/core';
// import { PaymentService } from './services/payment.service';
// import { loadStripe, Stripe, StripeCardElement } from '@stripe/stripe-js';
// import { HttpErrorResponse } from '@angular/common/http';

// @Component({
//   selector: 'app-payment',
//   templateUrl: './payment.component.html',
//   styleUrls: ['./payment.component.css']
// })
// export class PaymentComponent implements OnInit {
//   name: string = '';
//   email: string = '';
//   cardNumber: string = '';
//   amount: number = 0;
//   description: string = '';
//   expirationDate: string = '';
//   cvv: string = '';
//   phone: string = '';
//   agreeTerms: string = '';
//   cardElement: StripeCardElement | null = null;

//   stripe: Stripe | null = null; // Stripe instance

//   constructor(private paymentService: PaymentService) { }

//   async ngOnInit() {
//     try {
//       this.stripe = await loadStripe('pk_test_51OiEubE2Rb4TYvc4Nx4o7CK5cwdTLH51hEAyaZNg5wpJzu5oZZXkkoksQ5D7eUu4rsrXldnYQb0tOKA8kiEaL7xy005qQeBvQ9');
//       console.log("stripe", this.stripe);
//       if (!this.stripe) {
//         throw new Error('Failed to load Stripe');
//       }

//       // Initialize the card element
//       const elements = this.stripe.elements();
//       this.cardElement = elements.create('card');

//       // Mount the card element to the container
//       this.cardElement.mount('#card-element');
//     } catch (error) {
//       console.error('Error initializing Stripe:', error);
//     }
//   }

//   async makePayment(): Promise<void> {
//     if (!this.stripe || !this.cardElement) {
//       console.error('Stripe or card element is not initialized properly');
//       return;
//     }

//     try {
//       // Create token using Stripe.js
//       const { token, error } = await this.stripe.createToken(this.cardElement);

//       if (error) {
//         console.error('Error creating token:', error);
//         return;
//       }

//       const paymentData = {
//         stripeEmail: this.email,
//         amount: this.amount,
//         productName: this.description,
//         agreeTerms: this.agreeTerms,
//         phone: this.phone,
//         stripeToken: token.id // Include token in payment data
//       };
//       console.log(paymentData)

//       this.paymentService.processPayment(paymentData)
//         .subscribe(
//           response => {
//             if (response === 'done') {
//               console.log('Payment successful');
//               // Handle success response from backend
//             } else {
//               console.error('Unexpected response from server:', response.text);
//               // Handle unexpected response
//             }
//           },
//           error => {
//             console.error('Payment failed:', error);
//             // Handle error response from backend
//           }
//         );
//     } catch (error) {
//       console.error('Error processing payment:', error);
//     }
//   }
// }
// payment.component.ts

import { Component } from '@angular/core';
import { PaymentService } from './services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {

  iframeURL: string = "";

  constructor(private paymentService: PaymentService) { }

  initiatePayment() {
    this.paymentService.initiatePayment().subscribe(
      (response) => {
        console.log('Initiate payment response:', response);
        this.iframeURL = response.iframeURL;
        window.location.href = this.iframeURL;
      },
      (error) => {
        console.error('Error initiating payment:', error);
        // Handle error
      }
    );
  }
}
