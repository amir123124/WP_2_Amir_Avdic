import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

interface Task { title: string; project: string; priority: string; done: boolean; date: string; }

@Component({ selector: 'app-tasks', standalone: true, imports: [CommonModule, FormsModule, RouterModule], templateUrl: './tasks.html', styleUrls: ['./tasks.css'] })
export class TasksComponent implements OnInit {
  title = ''; project = ''; priority = 'Srednji'; tasks: Task[] = [];
  priorities = ['Visoki','Srednji','Niski'];
  constructor(private router: Router) {
    if (localStorage.getItem('loggedIn') !== 'true' && localStorage.getItem('isLoggedIn') !== 'true') this.router.navigateByUrl('/login');
  }
  ngOnInit() { const s = localStorage.getItem('tasks_list'); if (s) this.tasks = JSON.parse(s); }
  add() {
    if (!this.title) return;
    this.tasks.unshift({ title: this.title, project: this.project, priority: this.priority, done: false, date: new Date().toLocaleDateString('bs-BA') });
    this.title = ''; this.project = ''; this.priority = 'Srednji'; this.save();
  }
  toggle(t: Task) { t.done = !t.done; this.save(); }
  remove(i: number) { this.tasks.splice(i, 1); this.save(); }
  done() { return this.tasks.filter(t => t.done).length; }
  pending() { return this.tasks.filter(t => !t.done).length; }
  save() { localStorage.setItem('tasks_list', JSON.stringify(this.tasks)); }
  priorityColor(p: string) { return p === 'Visoki' ? '#e74c3c' : p === 'Srednji' ? '#d4a017' : '#27ae60'; }
}
