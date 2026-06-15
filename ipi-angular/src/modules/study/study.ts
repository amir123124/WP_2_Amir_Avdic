import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

interface Session { subject: string; duration: number; date: string; note: string; }

@Component({ selector: 'app-study', standalone: true, imports: [CommonModule, FormsModule, RouterModule], templateUrl: './study.html', styleUrls: ['./study.css'] })
export class StudyComponent implements OnInit {
  subject = ''; duration = 30; note = ''; sessions: Session[] = [];
  constructor(private router: Router) {
    if (localStorage.getItem('loggedIn') !== 'true' && localStorage.getItem('isLoggedIn') !== 'true') this.router.navigateByUrl('/login');
  }
  ngOnInit() { const s = localStorage.getItem('study_sessions'); if (s) this.sessions = JSON.parse(s); }
  add() {
    if (!this.subject || this.duration < 1) return;
    this.sessions.unshift({ subject: this.subject, duration: this.duration, date: new Date().toLocaleDateString('bs-BA'), note: this.note });
    this.subject = ''; this.duration = 30; this.note = ''; this.save();
  }
  remove(i: number) { this.sessions.splice(i, 1); this.save(); }
  total() { return this.sessions.reduce((s, x) => s + x.duration, 0); }
  totalHours() { const h = Math.floor(this.total()/60); const m = this.total()%60; return `${h}h ${m}min`; }
  save() { localStorage.setItem('study_sessions', JSON.stringify(this.sessions)); }
}
