import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

interface Transaction { desc: string; amount: number; type: 'prihod' | 'rashod'; category: string; date: string; }

@Component({ selector: 'app-finance', standalone: true, imports: [CommonModule, FormsModule, RouterModule], templateUrl: './finance.html', styleUrls: ['./finance.css'] })
export class FinanceComponent implements OnInit {
  desc = ''; amount = 0; type: 'prihod' | 'rashod' = 'rashod'; category = 'Ostalo';
  transactions: Transaction[] = [];
  categories = ['Hrana','Transport','Obrazovanje','Zabava','Zdravlje','Stanarina','Odjeća','Ostalo'];
  constructor(private router: Router) {
    if (localStorage.getItem('loggedIn') !== 'true' && localStorage.getItem('isLoggedIn') !== 'true') this.router.navigateByUrl('/login');
  }
  ngOnInit() { const s = localStorage.getItem('finance_data'); if (s) this.transactions = JSON.parse(s); }
  add() {
    if (!this.desc || this.amount <= 0) return;
    this.transactions.unshift({ desc: this.desc, amount: this.amount, type: this.type, category: this.category, date: new Date().toLocaleDateString('bs-BA') });
    this.desc = ''; this.amount = 0; this.save();
  }
  remove(i: number) { this.transactions.splice(i, 1); this.save(); }
  prihodi() { return this.transactions.filter(t => t.type === 'prihod').reduce((s,t) => s + t.amount, 0); }
  rashodi() { return this.transactions.filter(t => t.type === 'rashod').reduce((s,t) => s + t.amount, 0); }
  balans() { return this.prihodi() - this.rashodi(); }
  save() { localStorage.setItem('finance_data', JSON.stringify(this.transactions)); }
}
