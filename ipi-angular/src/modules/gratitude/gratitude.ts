import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

interface Entry { text: string; date: string; mood: string; }

@Component({ selector: 'app-gratitude', standalone: true, imports: [CommonModule, FormsModule, RouterModule], templateUrl: './gratitude.html', styleUrls: ['./gratitude.css'] })
export class GratitudeComponent implements OnInit {
  text = ''; mood = '😊'; entries: Entry[] = [];
  moods = ['😊','🥰','😌','🤩','😎','🙏','✨','💪'];
  constructor(private router: Router) {
    if (localStorage.getItem('loggedIn') !== 'true' && localStorage.getItem('isLoggedIn') !== 'true') this.router.navigateByUrl('/login');
  }
  ngOnInit() { const s = localStorage.getItem('gratitude_entries'); if (s) this.entries = JSON.parse(s); }
  add() {
    if (!this.text.trim()) return;
    this.entries.unshift({ text: this.text.trim(), date: new Date().toLocaleDateString('bs-BA'), mood: this.mood });
    this.text = ''; this.mood = '😊'; this.save();
  }
  remove(i: number) { this.entries.splice(i, 1); this.save(); }
  save() { localStorage.setItem('gratitude_entries', JSON.stringify(this.entries)); }
}
