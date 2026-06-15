import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

interface Reflection { date: string; wins: string; challenges: string; tomorrow: string; rating: number; }

@Component({ selector: 'app-reflection', standalone: true, imports: [CommonModule, FormsModule, RouterModule], templateUrl: './reflection.html', styleUrls: ['./reflection.css'] })
export class ReflectionComponent implements OnInit {
  wins = ''; challenges = ''; tomorrow = ''; rating = 5;
  reflections: Reflection[] = [];
  stars = [1,2,3,4,5,6,7,8,9,10];
  constructor(private router: Router) {
    if (localStorage.getItem('loggedIn') !== 'true' && localStorage.getItem('isLoggedIn') !== 'true') this.router.navigateByUrl('/login');
  }
  ngOnInit() { const s = localStorage.getItem('reflections'); if (s) this.reflections = JSON.parse(s); }
  add() {
    if (!this.wins.trim()) return;
    this.reflections.unshift({ date: new Date().toLocaleDateString('bs-BA'), wins: this.wins, challenges: this.challenges, tomorrow: this.tomorrow, rating: this.rating });
    this.wins = ''; this.challenges = ''; this.tomorrow = ''; this.rating = 5; this.save();
  }
  remove(i: number) { this.reflections.splice(i, 1); this.save(); }
  avgRating() {
    if (!this.reflections.length) return 0;
    return (this.reflections.reduce((s,r) => s + r.rating, 0) / this.reflections.length).toFixed(1);
  }
  save() { localStorage.setItem('reflections', JSON.stringify(this.reflections)); }
}
