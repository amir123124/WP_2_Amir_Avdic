import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

interface Habit {
  name: string;
  completed: number;
  target: number;
}

@Component({
  selector: 'app-habit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './habit.html',
  styleUrls: ['./habit.css']
})
export class HabitComponent implements OnInit {
  habitName = '';
  targetDays = 7;
  habits: Habit[] = [];

  constructor(private router: Router) {
    console.log('🔥 Habit tracker loading...');
    
    const loggedIn = localStorage.getItem('loggedIn');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    console.log('Habit tracker - login status:', { loggedIn, isLoggedIn });
    
    if (loggedIn !== 'true' && isLoggedIn !== 'true') {
      console.log('❌ Habit: User not logged in, redirecting to login');
      this.router.navigateByUrl('/login');
      return;
    }
    
    console.log('✅ Habit: User is logged in, continuing...');
  }

  ngOnInit() {
    const saved = localStorage.getItem('habits');
    if (saved) {
      this.habits = JSON.parse(saved);
    }
  }

  getHabitIcon(index: number): string {
    const icons = ['🔥', '📚', '💪', '🧠', '💧', '🍎', '😴', '🎯', '✨', '⚡'];
    return icons[index % icons.length];
  }

  getHabitColor(index: number): string {
    const colors = ['#43cea2', '#667eea', '#ff6b6b', '#ffd166', '#06d6a0', '#118ab2', '#ef476f', '#ffd166', '#06d6a0'];
    return colors[index % colors.length];
  }

  getTargetColor(): string {
    if (!this.targetDays) return '';
    if (this.targetDays <= 7) return '#43cea2';
    if (this.targetDays <= 21) return '#667eea';
    return '#ff6b6b';
  }

  getDaysRemaining(habit: Habit): number {
    return Math.max(0, habit.target - habit.completed);
  }

  getTotalCompleted(): number {
    return this.habits.reduce((sum, habit) => sum + habit.completed, 0);
  }

  getCompletionRate(): number {
    if (this.habits.length === 0) return 0;
    const totalPossible = this.habits.reduce((sum, habit) => sum + habit.target, 0);
    const totalCompleted = this.getTotalCompleted();
    return Math.round((totalCompleted / totalPossible) * 100);
  }

  getStreakCount(): number {
    return this.habits.filter(h => h.completed > 0).length;
  }

  addHabit() {
    if (!this.habitName || this.targetDays < 1) return;

    this.habits.push({
      name: this.habitName,
      completed: 0,
      target: this.targetDays
    });

    this.habitName = '';
    this.targetDays = 7;
    this.save();
  }

  markDone(habit: Habit) {
    if (habit.completed < habit.target) {
      habit.completed++;
      this.save();
    }
  }
  //obrisi naviku
 removeHabit(index: number) {
    this.habits.splice(index, 1);
    this.save();
  }

  progress(habit: Habit): number {
    return Math.round((habit.completed / habit.target) * 100);
  }

  save() {
    localStorage.setItem('habits', JSON.stringify(this.habits));
  }
}