import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './calendar.html',
  styleUrls: ['./calendar.css']
})
export class CalendarComponent {
  selectedDate: string = '';
  dates: string[] = [];
  message = '';

  constructor(private router: Router) {
    console.log('📅 Calendar tracker loading...');
    
    const loggedIn = localStorage.getItem('loggedIn');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    console.log('Calendar tracker - login status:', { loggedIn, isLoggedIn });
    
    if (loggedIn !== 'true' && isLoggedIn !== 'true') {
      console.log('❌ Calendar: User not logged in, redirecting to login');
      this.router.navigateByUrl('/login');
      return;
    }
    
    console.log('✅ Calendar: User is logged in, continuing...');
    
    const saved = localStorage.getItem('dates');
    if (saved) {
      this.dates = JSON.parse(saved);
    }
  }

  getTodayDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  getDaysUntil(dateString: string): string {
    const today = new Date();
    const targetDate = new Date(dateString);
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 0) return `${Math.abs(diffDays)} days ago`;
    return `In ${diffDays} days`;
  }
//ocisti datume
  clearDates(): void {
    if (confirm('Are you sure you want to clear all saved dates?')) {
      this.dates = [];
      localStorage.removeItem('dates');
      this.message = 'All dates cleared';
      setTimeout(() => this.message = '', 3000);
    }
  }

  save() {
    if (!this.selectedDate) {
      this.message = 'Please select a date first';
      return;
    }

    if (this.dates.includes(this.selectedDate)) {
      this.message = 'Date already exists in your calendar';
      return;
    }

    this.dates.unshift(this.selectedDate);
    localStorage.setItem('dates', JSON.stringify(this.dates));

    this.message = `Date saved successfully! ${this.formatDate(this.selectedDate)}`;
    this.selectedDate = '';
    
    setTimeout(() => this.message = '', 4000);
  }

  remove(index: number) {
    this.dates.splice(index, 1);
    localStorage.setItem('dates', JSON.stringify(this.dates));
  }
}