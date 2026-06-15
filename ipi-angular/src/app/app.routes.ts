import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { RegisterComponent } from './auth/register/register';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: 'dashboard',
    loadComponent: () => import('../dashboard/dashboard').then(m => m.DashboardComponent)
  },

  { path: 'dashboard/habit',      loadComponent: () => import('../modules/habit/habit').then(m => m.HabitComponent) },
  { path: 'dashboard/sleep',      loadComponent: () => import('../modules/sleep/sleep').then(m => m.SleepComponent) },
  { path: 'dashboard/mood',       loadComponent: () => import('../modules/mood/mood').then(m => m.MoodComponent) },
  { path: 'dashboard/meal',       loadComponent: () => import('../modules/meal/meal').then(m => m.MealComponent) },
  { path: 'dashboard/calendar',   loadComponent: () => import('../modules/calendar/calendar').then(m => m.CalendarComponent) },
  { path: 'dashboard/water',      loadComponent: () => import('../modules/water/water').then(m => m.WaterComponent) },
  { path: 'dashboard/study',      loadComponent: () => import('../modules/study/study').then(m => m.StudyComponent) },
  { path: 'dashboard/fitness',    loadComponent: () => import('../modules/fitness/fitness').then(m => m.FitnessComponent) },
  { path: 'dashboard/tasks',      loadComponent: () => import('../modules/tasks/tasks').then(m => m.TasksComponent) },
  { path: 'dashboard/finance',    loadComponent: () => import('../modules/finance/finance').then(m => m.FinanceComponent) },
  { path: 'dashboard/gratitude',  loadComponent: () => import('../modules/gratitude/gratitude').then(m => m.GratitudeComponent) },
  { path: 'dashboard/reflection', loadComponent: () => import('../modules/reflection/reflection').then(m => m.ReflectionComponent) },

  // ── Funzone ──
  {
    path: 'dashboard/funzone',
    loadComponent: () => import('./funzone/student-funzone.component').then(m => m.StudentFunzoneComponent)
  },
  {
    path: 'dashboard/funzone/bingo',
    loadComponent: () => import('../modules/bingo/bingo').then(m => m.BingoComponent)
  },
  {
    path: 'dashboard/funzone/kviz',
    loadComponent: () => import('../modules/kviz/kviz').then(m => m.KvizComponent)
  },
  {
    path: 'dashboard/funzone/kanban',
    loadComponent: () => import('../modules/kanbanboard/kanban').then(m => m.KanbanComponent)
  },
  {
    path: 'dashboard/funzone/whiteboard',
    loadComponent: () => import('../modules/whiteboard/whiteboard').then(m => m.WhiteboardComponent)
  },
  {
    path: 'dashboard/funzone/visionboard',
    loadComponent: () => import('../modules/visionboard/visionboard').then(m => m.VisionboardComponent)
  },

  // Wildcard - mora biti ZADNJI
  { path: '**', redirectTo: 'login' }
];
