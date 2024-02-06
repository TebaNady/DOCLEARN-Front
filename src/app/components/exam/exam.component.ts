import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {

  questions: any[] = []; // Array to hold questions
  currentPage: number = 0;
  pageSize: number = 2;
  correctAnswers: number = 0;
  totalQuestions: number = 0;
  score: number = 0;
  message: string = '';
  isPopupOpen: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Initialize questions (fetch questions from service or data source)
    this.questions = [
      { text: 'What is your favorite color?', options: ['Red', 'Blue', 'Green'], correctAnswer: 'Blue' },
      { text: 'What is your favorite animal?', options: ['Dog', 'Cat', 'Bird'], correctAnswer: 'Dog' },
      { text: 'What is your favorite fruit?', options: ['Apple', 'Banana', 'Orange'], correctAnswer: 'Banana' }
      // Add more questions as needed
    ];

    // Randomize questions
    this.questions = this.shuffleArray(this.questions);

    // Randomize options for each question
    this.questions.forEach(question => {
      question.options = this.shuffleArray(question.options);
    });
  }

  // Shuffle array function
  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
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
    return this.questions.every(question => question.selectedAnswer !== undefined);
  }

  showResult(): void {
    this.correctAnswers = this.questions.filter(question => question.selectedAnswer === question.correctAnswer).length;
    this.totalQuestions = this.questions.length;
    this.score = (this.correctAnswers / this.totalQuestions) * 100;
    this.message = `You answered ${this.correctAnswers} out of ${this.totalQuestions} questions correctly. Your score is ${this.score.toFixed(2)}%`;

    // Open the popup
    this.isPopupOpen = true;
  }

  closePopup(): void {
    this.isPopupOpen = false;
    this.router.navigateByUrl('/login');
  }
}
