import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

interface Meal {
  name: string;
  calories: number;
  type: string;
  date: string;
}

@Component({
  selector: 'app-meal',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './meal.html',
  styleUrls: ['./meal.css']
})
export class MealComponent implements OnInit {

  mealName = '';
  calories: number | null = null;
  mealType = '';
  meals: Meal[] = [];

  constructor(private router: Router) {
    console.log('🍽️ Meal tracker loading...');
    
    const loggedIn = localStorage.getItem('loggedIn');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    console.log('Meal tracker - login status:', { loggedIn, isLoggedIn });
    
    if (loggedIn !== 'true' && isLoggedIn !== 'true') {
      console.log('❌ Meal: User not logged in, redirecting to login');
      this.router.navigateByUrl('/login');
      return;
    }
    
    console.log('✅ Meal: User is logged in, continuing...');
  }

  ngOnInit(): void {
    const saved = localStorage.getItem('meals');
    if (saved) {
      this.meals = JSON.parse(saved);
    }
  }

  getCalorieColor(): string {
    if (!this.calories) return '';
    if (this.calories <= 300) return '#43e97b';
    if (this.calories <= 600) return '#ffc107';
    return '#ff5722';
  }

  getMealCount(): number {
    return this.meals.length;
  }

  getAvgCalories(): number {
    if (this.meals.length === 0) return 0;
    return Math.round(this.totalCalories() / this.meals.length);
  }

  getMostCommonMeal(): string {
    if (this.meals.length === 0) return 'None';
    
    const types = this.meals.map(m => m.type);
    const counts: { [key: string]: number } = {};
    
    types.forEach(type => {
      counts[type] = (counts[type] || 0) + 1;
    });
    
    return Object.keys(counts).reduce((a, b) => 
      counts[a] > counts[b] ? a : b
    );
  }
//dodaj obrok
  addMeal() {
    if (!this.mealName || !this.calories || !this.mealType) return;

    this.meals.unshift({
      name: this.mealName,
      calories: this.calories,
      type: this.mealType,
      date: new Date().toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    });

    this.mealName = '';
    this.calories = null;
    this.mealType = '';

    this.save();
  }

  deleteMeal(index: number) {
    this.meals.splice(index, 1);
    this.save();
  }

  totalCalories(): number {
    return this.meals.reduce((sum, m) => sum + m.calories, 0);
  }

  save() {
    localStorage.setItem('meals', JSON.stringify(this.meals));
  }
}