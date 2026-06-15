import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

interface Workout { type: string; duration: number; calories: number; date: string; }

@Component({ selector: 'app-fitness', standalone: true, imports: [CommonModule, FormsModule, RouterModule], templateUrl: './fitness.html', styleUrls: ['./fitness.css'] })
export class FitnessComponent implements OnInit {
  type = ''; duration = 30; calories = 0; workouts: Workout[] = [];
  types = ['Yoga','Trčanje','Bicikl','Teretana','Plivanje','Hodanje','Stretching','HIIT','Pilates','Drugo'];
  constructor(private router: Router) {
    if (localStorage.getItem('loggedIn') !== 'true' && localStorage.getItem('isLoggedIn') !== 'true') this.router.navigateByUrl('/login');
  }
  ngOnInit() { const s = localStorage.getItem('fitness_workouts'); if (s) this.workouts = JSON.parse(s); }
  add() {
    if (!this.type || this.duration < 1) return;
    this.workouts.unshift({ type: this.type, duration: this.duration, calories: this.calories, date: new Date().toLocaleDateString('bs-BA') });
    this.type = ''; this.duration = 30; this.calories = 0; this.save();
  }
  remove(i: number) { this.workouts.splice(i, 1); this.save(); }
  totalMin() { return this.workouts.reduce((s, x) => s + x.duration, 0); }
  totalCal() { return this.workouts.reduce((s, x) => s + x.calories, 0); }
  save() { localStorage.setItem('fitness_workouts', JSON.stringify(this.workouts)); }
}
