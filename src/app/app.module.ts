import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ChooseExamComponent } from './components/choose-exam/choose-exam.component';
import { ExamComponent } from './components/exam/exam.component';
import { ResultComponent } from './components/result/result.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PaymentComponent } from './payment/payment.component';
import { ChooseExamTypeComponent } from './components/choose-exam-type/choose-exam-type.component';
import { ExamEndRoundComponent } from './components/exam-end-round/exam-end-round.component';
import { ChooseFacultyComponent } from './components/choose-faculty/choose-faculty.component';
import { PaymentChooseComponent } from './components/payment-choose/payment-choose.component';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    ChooseExamComponent,
    ExamComponent,
    ResultComponent,
    HeaderComponent,
    PaymentComponent,
    ChooseExamTypeComponent,
    ExamEndRoundComponent,
    ChooseFacultyComponent,
    PaymentChooseComponent,
    TermsAndConditionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
