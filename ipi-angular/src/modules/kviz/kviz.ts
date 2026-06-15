import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
}

@Component({
  selector: 'app-kviz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kviz.html',
  styleUrl: './kviz.css',
  encapsulation: ViewEncapsulation.None,
})
export class KvizComponent {

  letters = ['A', 'B', 'C', 'D'];

  quizData: QuizQuestion[] = [
    {
      question: "Šta znači skraćenica HTML?",
      options: ["Hyper Text Markup Language","High Tech Markup Language","Hyper Tabular Markup Language","Home Tool Markup Language"],
      correct: 0
    },
    {
      question: "Koji CSS selektor se koristi za označavanje elementa sa jedinstvenim ID-jem?",
      options: ["Tačka (.)","Znak taraba (#)","Zvijezdica (*)","Kosa crta (/)"],
      correct: 1
    },
    {
      question: "Koja JavaScript metoda se koristi za trajno spašavanje ključ-vrijednost parova u pretraživaču?",
      options: ["sessionStorage.setItem()","content.save()","localStorage.setItem()","cache.store()"],
      correct: 2
    },
    {
      question: "Koji HTML5 element obezbjeđuje površinu na kojoj možemo crtati grafiku u JavaScriptu?",
      options: ["<svg-art>","<canvas>","<paint>","<board>"],
      correct: 1
    },
    {
      question: "Unutar kojeg HTML elementa ugrađujemo eksterni JavaScript fajl?",
      options: ["<script>","<javascript>","<js>","<link>"],
      correct: 0
    },
    {
      question: "Koji CSS property koristimo za fleksibilni raspored elemenata u redu ili koloni?",
      options: ["display: block","display: flex","display: grid","display: inline"],
      correct: 1
    },
    {
      question: "Šta je Angular?",
      options: ["Programski jezik","Baza podataka","Frontend framework baziran na TypeScriptu","Server-side platforma"],
      correct: 2
    },
    {
      question: "Koji format koristimo za razmjenu podataka između klijenta i servera?",
      options: ["XML","JSON","CSV","TXT"],
      correct: 1
    },
    {
      question: "Šta je localStorage u web pretraživaču?",
      options: ["Online cloud storage","Privremena memorija koja se briše zatvaranjem taba","Trajno skladište podataka na klijentskoj strani","Server baza podataka"],
      correct: 2
    },
    {
      question: "Koji HTTP metod koristimo za slanje podataka na server?",
      options: ["GET","DELETE","POST","HEAD"],
      correct: 2
    }
  ];

  currentQuestion = 0;
  score = 0;
  selectedIndex = -1;
  answered = false;
  showResults = false;

  get progressPercent(): number {
    return (this.currentQuestion / this.quizData.length) * 100;
  }

  get scorePercent(): number {
    return Math.round((this.score / this.quizData.length) * 100);
  }

  constructor(private router: Router) {}

  selectOption(index: number): void {
    if (this.answered) return;
    this.selectedIndex = index;
    this.answered = true;
    if (index === this.quizData[this.currentQuestion].correct) {
      this.score++;
    }
  }

  nextQuestion(): void {
    if (this.currentQuestion + 1 < this.quizData.length) {
      this.currentQuestion++;
      this.selectedIndex = -1;
      this.answered = false;
    } else {
      this.showResults = true;
    }
  }

  restart(): void {
    this.currentQuestion = 0;
    this.score = 0;
    this.selectedIndex = -1;
    this.answered = false;
    this.showResults = false;
  }

  goBack(): void {
    this.router.navigateByUrl('/dashboard/funzone');
  }
}
