import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-funzone',
  standalone: true,
  templateUrl: './student-funzone.component.html',
  styleUrls: ['./student-funzone.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class StudentFunzoneComponent {

  constructor(private router: Router) {}

  private routes: Record<string, string> = {
    bingo:       '/dashboard/funzone/bingo',
    kviz:        '/dashboard/funzone/kviz',
    kanban:      '/dashboard/funzone/kanban',
    whiteboard:  '/dashboard/funzone/whiteboard',
    visionboard: '/dashboard/funzone/visionboard',
  };

  open(key: string): void {
    const route = this.routes[key];
    if (route) {
      this.router.navigateByUrl(route);
    } else {
      console.warn('Nepoznati modul:', key);
    }
  }

  goBack(): void {
    this.router.navigateByUrl('/dashboard');
  }
}
