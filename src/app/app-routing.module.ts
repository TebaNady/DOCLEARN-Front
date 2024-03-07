import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ChooseExamComponent } from './components/choose-exam/choose-exam.component';
import { ExamComponent } from './components/exam/exam.component';
import { ResultComponent } from './components/result/result.component';
import { AuthGuard } from './auth.guard'; // Import the route guard
import { ChooseExamTypeComponent } from './components/choose-exam-type/choose-exam-type.component';
import { ExamEndRoundComponent } from './components/exam-end-round/exam-end-round.component';
import { ChooseFacultyComponent } from './components/choose-faculty/choose-faculty.component';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'choose', component: ChooseExamComponent, canActivate: [AuthGuard] }, // Apply guard here
  { path: 'exam', component: ExamComponent, canActivate: [AuthGuard] }, // Apply guard here
  { path: 'result', component: ResultComponent, canActivate: [AuthGuard] },// Apply guard here
  { path: 'examType', component: ChooseExamTypeComponent, canActivate: [AuthGuard] },
  { path: 'exam-end-round', component: ExamEndRoundComponent, canActivate: [AuthGuard] },
  { path: 'faculty', component: ChooseFacultyComponent, canActivate: [AuthGuard] },
  { path: 'termsAndConditions', component: TermsAndConditionsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
