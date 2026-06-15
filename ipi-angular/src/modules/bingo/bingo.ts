import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface QuizQuestion {
  q: string;
  a: string;
}

@Component({
  selector: 'app-bingo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bingo.html',
  styleUrl: './bingo.css',
  encapsulation: ViewEncapsulation.None,
})
export class BingoComponent {

  private poolOfTerms: string[] = [
    "HTML", "CSS", "JavaScript", "SQL", "Git",
    "Java", "Python", "PHP", "Bootstrap", "Linux",
    "API", "JSON", "Canvas", "Local Storage", "HTTP",
    "GitHub", "Database", "Node.js", "DOM", "Array",
    "Variable", "Loop", "Function", "Button", "iframe"
  ];

  private quizQuestions: QuizQuestion[] = [
    { q: "Koji jezik se koristi za definisanje osnovne strukture i skeleta web stranice?", a: "HTML" },
    { q: "Koji tehnološki jezik koristimo za stilizovanje, dizajn i izgled elemenata?", a: "CSS" },
    { q: "Koji skriptni jezik omogućava interaktivnost i dinamiku na klijentskoj strani?", a: "JavaScript" },
    { q: "Koji se upitni jezik najčešće koristi za rad sa relacionim bazama podataka?", a: "SQL" },
    { q: "Koji je najpopularniji sistem za kontrolu verzija koda (Version Control)?", a: "Git" },
    { q: "Koji operativni sistem otvorenog koda programeri najčešće koriste za servere?", a: "Linux" },
    { q: "Kako se naziva skraćenica za Application Programming Interface?", a: "API" },
    { q: "Koji lagani format za razmjenu podataka se bazira na JavaScript objektima?", a: "JSON" },
    { q: "Koji HTML5 element koristimo za crtanje grafike i whiteboard ploče pomoću skripti?", a: "Canvas" },
    { q: "Koji mehanizam u pretraživaču koristimo da trajno spasimo podatke na klijentu bez isteka?", a: "Local Storage" },
    { q: "Koji se protokol koristi za prenos hipertekstualnih dokumenata na webu?", a: "HTTP" },
    { q: "Koji HTML element koristimo za ugradnju jedne web stranice unutar druge?", a: "iframe" },
    { q: "Kako se skraćeno naziva Document Object Model koji predstavlja strukturu stranice kao stablo?", a: "DOM" },
    { q: "Struktura podataka koja skladišti kolekciju elemenata na uzastopnim indeksima je...?", a: "Array" },
    { q: "Koji se pojam koristi za imenovanu memorijsku lokaciju u koju skladištimo podatke?", a: "Variable" }
  ];

  boardState: boolean[] = Array(25).fill(false);
  cellTerms: string[] = Array(25).fill('');
  wrongFlash: boolean[] = Array(25).fill(false);

  activeQuestions: QuizQuestion[] = [];
  currentQuestionIndex = 0;
  score = 0;

  gameStarted = false;
  idle = true;
  showWin = false;

  currentQuestionText = "Kliknite na dugme ispod da započnete kviz.";
  remainingText = "—";

  constructor(private router: Router) {}

  initGame(): void {
    this.gameStarted = true;
    this.showWin = false;
    this.score = 0;

    this.boardState = Array(25).fill(false);
    this.boardState[12] = true;
    this.wrongFlash = Array(25).fill(false);

    this.cellTerms = [...this.poolOfTerms].sort(() => Math.random() - 0.5);
    this.cellTerms[12] = "FREE SPACE";

    this.activeQuestions = [...this.quizQuestions].sort(() => Math.random() - 0.5);
    this.currentQuestionIndex = 0;

    this.idle = false;
    this.nextQuestion();
  }

  nextQuestion(): void {
    this.remainingText = String(this.activeQuestions.length - this.currentQuestionIndex);

    if (this.currentQuestionIndex < this.activeQuestions.length) {
      this.currentQuestionText = this.activeQuestions[this.currentQuestionIndex].q;
    } else {
      this.currentQuestionText = "Nestalo je pitanja. Kliknite 'Igraj ponovo' za novu partiju.";
      this.idle = true;
    }
  }

  handleCellClick(index: number): void {
    if (
      this.boardState[index] ||
      this.activeQuestions.length === 0 ||
      this.currentQuestionIndex >= this.activeQuestions.length
    ) {
      return;
    }

    const currentAnswer = this.activeQuestions[this.currentQuestionIndex].a;
    const clickedTerm = this.cellTerms[index];

    if (clickedTerm === currentAnswer) {
      this.boardState[index] = true;
      this.score++;
      this.currentQuestionIndex++;

      if (this.checkBingo()) {
        this.showWin = true;
        this.currentQuestionText = "Pobijedili ste — BRAVO!";
        return;
      }
      this.nextQuestion();
    } else {
      this.wrongFlash[index] = true;
      setTimeout(() => {
        if (!this.boardState[index]) this.wrongFlash[index] = false;
      }, 350);
    }
  }

  checkBingo(): boolean {
    const winningLines = [
      [0,1,2,3,4],[5,6,7,8,9],[10,11,12,13,14],[15,16,17,18,19],[20,21,22,23,24],
      [0,5,10,15,20],[1,6,11,16,21],[2,7,12,17,22],[3,8,13,18,23],[4,9,14,19,24],
      [0,6,12,18,24],[4,8,12,16,20]
    ];
    return winningLines.some(line => line.every(i => this.boardState[i]));
  }

  restart(): void {
    this.showWin = false;
    this.initGame();
  }

  goBack(): void {
    this.router.navigateByUrl('/dashboard/funzone');
  }
}
