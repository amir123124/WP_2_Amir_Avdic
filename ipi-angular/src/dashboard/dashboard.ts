import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('dashboardEl') dashboardEl!: ElementRef<HTMLElement>;

  username    = 'Korisnik';
  timeOfDay   = 'dan';
  currentTime = '';
  colorMode: 'dark' | 'light' = 'dark';

  private clockInterval?: ReturnType<typeof setInterval>;
  private mouseMoveHandler?: (e: MouseEvent) => void;
  private keydownHandler?: (e: KeyboardEvent) => void;

  modules = [
    { key: 'habit',      label: 'Navike',         icon: '🔥', desc: 'dnevni tracker'     },
    { key: 'sleep',      label: 'San',             icon: '🌙', desc: 'praćenje sna'       },
    { key: 'water',      label: 'Voda',            icon: '💧', desc: 'hidratacija'        },
    { key: 'mood',       label: 'Raspoloženje',    icon: '🧠', desc: 'mentalno stanje'    },
    { key: 'meal',       label: 'Obrok',           icon: '🍽️', desc: 'prehrana'           },
    { key: 'calendar',   label: 'Kalendar',        icon: '📅', desc: 'raspored'           },
    { key: 'study',      label: 'Učenje',          icon: '📚', desc: 'study planner'      },
    { key: 'fitness',    label: 'Fitness / Yoga',  icon: '🧘', desc: 'tjelesna aktivnost' },
    { key: 'tasks',      label: 'Zadaci',          icon: '✅', desc: 'project planner'    },
    { key: 'finance',    label: 'Finansije',       icon: '💰', desc: 'mini tracker'       },
    { key: 'gratitude',  label: 'Zahvalnost',      icon: '🙏', desc: 'gratitude journal'  },
    { key: 'reflection', label: 'Refleksija',      icon: '📝', desc: 'dnevna refleksija'  },
  ];

  constructor(private router: Router) {
    const loggedIn   = localStorage.getItem('loggedIn');
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (loggedIn !== 'true' && isLoggedIn !== 'true') {
      this.router.navigateByUrl('/login');
    }
  }

  toggleColorMode(): void {
    this.colorMode = this.colorMode === 'dark' ? 'light' : 'dark';
    localStorage.setItem('colorMode', this.colorMode);
    const theme = localStorage.getItem('activeTheme') || 'dark';
    this.applyThemeWithMode(theme, this.colorMode);
  }

  private applyThemeWithMode(theme: string, mode: 'dark' | 'light'): void {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-mode', mode);
    document.body.setAttribute('data-theme', theme);
    document.body.setAttribute('data-mode', mode);
  }

  ngOnInit(): void {
    // ── Primijeni temu i color mode ──
    const theme = localStorage.getItem('activeTheme') || 'dark';
    this.colorMode = (localStorage.getItem('colorMode') as 'dark' | 'light') || 'dark';
    this.applyThemeWithMode(theme, this.colorMode);

    // Pozdrav prema dobu dana
    const h = new Date().getHours();
    if (h < 12)      this.timeOfDay = 'jutro';
    else if (h < 18) this.timeOfDay = 'dan';
    else             this.timeOfDay = 'večer';

    // Korisničko ime
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const parsed = JSON.parse(userStr);
        this.username = parsed.name || 'Korisnik';
      } catch { /* ignore */ }
    }

    // Sat u realnom vremenu
    this.updateClock();
    this.clockInterval = setInterval(() => this.updateClock(), 10_000);

    // Keyboard shortcut ⌘K / Ctrl+K
    this.keydownHandler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const input = document.querySelector<HTMLInputElement>('.command input');
        input?.focus();
      }
    };
    window.addEventListener('keydown', this.keydownHandler);
  }

  ngAfterViewInit(): void {
    this.mouseMoveHandler = (e: MouseEvent) => {
      const el = this.dashboardEl?.nativeElement;
      if (!el) return;
      const x = (window.innerWidth  / 2 - e.clientX) / 50;
      const y = (window.innerHeight / 2 - e.clientY) / 50;
      el.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    };
    document.addEventListener('mousemove', this.mouseMoveHandler);
  }

  ngOnDestroy(): void {
    if (this.clockInterval)    clearInterval(this.clockInterval);
    if (this.mouseMoveHandler) document.removeEventListener('mousemove', this.mouseMoveHandler);
    if (this.keydownHandler)   window.removeEventListener('keydown', this.keydownHandler);
  }

  open(module: string): void {
    this.router.navigateByUrl('/dashboard/' + module);
  }

  openStudentFunZone(): void {
    this.router.navigateByUrl('/dashboard/funzone');
  }

  logout(): void {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('activeTheme');
    localStorage.removeItem('colorMode');
    sessionStorage.removeItem('isLoggedIn');
    this.router.navigateByUrl('/login');
  }

  runCommand(cmd: string): void {
    const map: Record<string, string> = {
      navike:       'habit',
      habit:        'habit',
      san:          'sleep',
      sleep:        'sleep',
      voda:         'water',
      water:        'water',
      raspolozenje: 'mood',
      raspoloženje: 'mood',
      mood:         'mood',
      obrok:        'meal',
      meal:         'meal',
      kalendar:     'calendar',
      calendar:     'calendar',
      ucenje:       'study',
      učenje:       'study',
      study:        'study',
      fitness:      'fitness',
      yoga:         'fitness',
      zadaci:       'tasks',
      tasks:        'tasks',
      finansije:    'finance',
      finance:      'finance',
      zahvalnost:   'gratitude',
      gratitude:    'gratitude',
      refleksija:   'reflection',
      reflection:   'reflection',
      funzone:      'funzone',
    };
    const key = map[cmd.toLowerCase().trim()];
    if (key === 'funzone') {
      this.openStudentFunZone();
    } else if (key) {
      this.open(key);
    }
  }

  private updateClock(): void {
    const now = new Date();
    const h   = String(now.getHours()).padStart(2, '0');
    const m   = String(now.getMinutes()).padStart(2, '0');
    this.currentTime = `${h}:${m}`;
  }
}
