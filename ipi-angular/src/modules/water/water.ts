import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// komponente
@Component({
  selector: 'app-water',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './water.html',
  styleUrls: ['./water.css']
})
export class WaterComponent implements OnInit {

  dailyGoal = 2000; // ml
  current = 0;
  message = '';

  ngOnInit() {
    const saved = localStorage.getItem('water');
    if (saved) {
      this.current = Number(saved);
    }
    this.updateMessage();
  }

  add(amount: number) {
    this.current += amount;
    if (this.current > this.dailyGoal) {
      this.current = this.dailyGoal;
    }
    this.save();
  }

  reset() {
    this.current = 0;
    this.save();
  }

  percent(): number {
    return Math.min(100, Math.round((this.current / this.dailyGoal) * 100));
  }

  save() {
    localStorage.setItem('water', this.current.toString());
    this.updateMessage();
  }

  updateMessage() {
    const p = this.percent();

    if (p === 0) this.message = 'Počni dan sa čašom vode 💧';
    else if (p < 40) this.message = 'Tijelo je žedno – popij još vode';
    else if (p < 70) this.message = 'Dobro ide, nastavi!';
    else if (p < 100) this.message = 'Skoro si na cilju 👌';
    else this.message = 'Bravo! Hidratacija na maksimumu 💙';
  }
}
