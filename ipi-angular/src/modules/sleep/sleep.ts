import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-sleep',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './sleep.html',
  styleUrls: ['./sleep.css']
})
export class SleepComponent {
  hours: number | null = null;
  quality: string = '';
  message: string = '';

  constructor(private router: Router) {
    console.log('🌙 Sleep tracker loading...');
    
    const loggedIn = localStorage.getItem('loggedIn');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    console.log('Sleep tracker - login status:', { loggedIn, isLoggedIn });
    
    if (loggedIn !== 'true' && isLoggedIn !== 'true') {
      console.log('❌ Sleep: User not logged in, redirecting to login');
      this.router.navigateByUrl('/login');
      return;
    }
    
    console.log('✅ Sleep: User is logged in, continuing...');
  }

  calculateSleepScore(): number {
    if (!this.hours || !this.quality) return 0;
    
    let score = 0;
    
    if (this.hours >= 7 && this.hours <= 9) {
      score += 60;
    } else if (this.hours >= 6 && this.hours <= 10) {
      score += 40;
    } else {
      score += 20;
    }
    //kako smo spavali
    const qualityScores: { [key: string]: number } = {
      'Excellent': 40,
      'Deep': 40,
      'Good': 30,
      'Average': 20,
      'Restless': 10,
      'Poor': 5
    };
    
    score += qualityScores[this.quality] || 10;
    
    return Math.min(100, Math.round(score));
  }

  save() {
    if (!this.hours || !this.quality) {
      this.message = 'Please enter sleep duration and select quality.';
      return;
    }

    this.message = `Sleep data saved! 🌙 ${this.hours}h • ${this.quality} quality • Score: ${this.calculateSleepScore()}%`;
  }
}