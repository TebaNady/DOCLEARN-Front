import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionsService } from 'src/app/questions.service';

@Component({
  selector: 'app-exam-end-round',
  templateUrl: './exam-end-round.component.html',
  styleUrls: ['./exam-end-round.component.css']
})
export class ExamEndRoundComponent implements OnInit {

  questions !: any[]; // Array to hold questions
  currentPage: number = 0;
  pageSize: number = 2;
  correctAnswers !: number ;
  totalQuestions: number = 0;
  score: number = 0;
  message: string = '';
  isPopupOpen: boolean = false;
  isLoading: boolean = false;

  constructor(private router: Router, private http: HttpClient, private service: QuestionsService) { }

  ngOnInit(): void {
    this.service.getAllQuestions().subscribe(
      (questions) => {
        this.questions = questions as any[];
      },
      (error) => {
        console.error('Error fetching product details:', error);
      }
    );
    this.getQuestions()
    this.isLoading = true;
  }
  
  getQuestions() {
    this.service.getAllQuestions().subscribe((res: any) => {
      this.questions = res.questions.slice(0, 10);
        this.totalQuestions = this.questions.length;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching questions:', error);
        this.isLoading = false;}
      )
  }


  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  get totalPages(): number {
    return Math.ceil(this.questions.length / this.pageSize);
  }

  getCurrentPageQuestions(): any[] {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.questions.length);
    return this.questions.slice(startIndex, endIndex);
  }

  checkAnswer(question: any, selectedOption: string): void {
    // Only set the selected answer if the question doesn't already have one
    if (!question.selectedAnswer) {
      question.selectedAnswer = selectedOption;
    }
  }

  isAllQuestionsAnswered(): boolean {
    return this.questions.every(question => question.Answer !== undefined);
  }

  showResult(): void {
    // Count the correct answers
    this.correctAnswers = this.questions.filter(question => question.selectedAnswer  === question.Answer).length;
  
    // Calculate the total number of questions
    this.totalQuestions = this.questions.length;
  
    // Calculate the score
    this.score = (this.correctAnswers / this.totalQuestions) * 100;
  
    // Create the message to display
    this.message = `You answered ${this.correctAnswers} out of ${this.totalQuestions} questions correctly. Your result is ${this.score.toFixed(2)}%`;
  
    // Open the popup
    this.isPopupOpen = true;
  }
  

  closePopup(): void {
    this.isPopupOpen = false;
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
  @HostListener('contextmenu', ['$event'])
  onRightClick(event: Event): void {
    event.preventDefault();
    alert('You cannot copy or print the exam :D')
  }

  // Prevent keyboard shortcuts
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.ctrlKey && event.key === 'c') {
      event.preventDefault(); // Prevent Ctrl + C
      alert('You cannot copy or print the exam :D')
    }
    if (event.ctrlKey && event.key === 'v') {
      event.preventDefault(); // Prevent Ctrl + V
      alert('You cannot copy or print the exam :D')
    }
    
    // Add more conditions for other keyboard shortcuts
  }
}
