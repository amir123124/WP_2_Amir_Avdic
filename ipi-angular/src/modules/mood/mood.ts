import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

interface Mood {
  mood: string;
  note: string;
  date: string;
}

@Component({
  selector: 'app-mood',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './mood.html',
  styleUrls: ['./mood.css']
})
export class MoodComponent implements OnInit {

  selectedMood = '';
  note = '';
  message = '';
  moods: Mood[] = [];

  constructor(private router: Router) {
    console.log('🧠 Mood tracker loading...');
    
    const loggedIn = localStorage.getItem('loggedIn');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    console.log('Mood tracker - login status:', { loggedIn, isLoggedIn });
    
    if (loggedIn !== 'true' && isLoggedIn !== 'true') {
      console.log('❌ Mood: User not logged in, redirecting to login');
      this.router.navigateByUrl('/login');
      return;
    }
    
    console.log('✅ Mood: User is logged in, continuing...');
  }

  ngOnInit() {
    const saved = localStorage.getItem('moods');
    if (saved) {
      this.moods = JSON.parse(saved);
    }
  }

  getMoodEmoji(mood: string): string {
    const emojiMap: { [key: string]: string } = {
      'Angry': '😡',
      'Sad': '😔',
      'Neutral': '😐',
      'Happy': '😊',
      'Excited': '🤩',
      'Calm': '😌',
      'Tired': '😴',
      'Anxious': '😰'
    };
    return emojiMap[mood] || '😐';
  }

  saveMood() {
    if (!this.selectedMood) {
      this.message = 'Please select a mood to continue.';
      return;
    }

    this.moods.unshift({
      mood: this.selectedMood,
      note: this.note,
      date: new Date().toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    });

    localStorage.setItem('moods', JSON.stringify(this.moods));

    this.message = 'Mood saved successfully! 🌟';
    this.selectedMood = '';
    this.note = '';
  }
//za brisanje
  deleteMood(index: number) {
    this.moods.splice(index, 1);
    localStorage.setItem('moods', JSON.stringify(this.moods));
  }

  clearHistory() {
    if (confirm('Are you sure you want to clear all mood history?')) {
      this.moods = [];
      localStorage.removeItem('moods');
    }
  }
}