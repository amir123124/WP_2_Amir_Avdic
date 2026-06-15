import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
  encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent implements OnInit {
  name = '';
  email = '';
  password = '';
  theme = 'dark';
  error = '';
  loading = false;
  passwordStrength = 0;

  // Inline pozadina — direktno se primjenjuje bez CSS varijabli
  bgStyle = '';
  cardBorderColor = '#d4a017';
  accentColor = '#d4a017';
  accentLight = '#f0c040';
  fieldBg = '#f7f8fb';
  fieldBorder = '#dde1ec';
  textColor = '#1a2a4a';
  textMuted = '#6b7a99';
  cardBg = '#ffffff';

  private themeMap: Record<string, any> = {
    dark:      { bg: 'linear-gradient(160deg,#0d1b3e 0%,#1a2a4a 55%,#0e2250 100%)', accent: '#d4a017', accentLt: '#f0c040', card: '#ffffff', text: '#1a2a4a', muted: '#6b7a99', fieldBg: '#f7f8fb', fieldBdr: '#dde1ec', border: '#d4a017' },
    blue:      { bg: 'linear-gradient(160deg,#03133a 0%,#1565c0 55%,#0a3070 100%)', accent: '#42a5f5', accentLt: '#90caf9', card: '#ffffff', text: '#0d2137', muted: '#4a6a8a', fieldBg: '#f0f6ff', fieldBdr: '#b3d4f5', border: '#42a5f5' },
    green:     { bg: 'linear-gradient(160deg,#071a07 0%,#1b5e20 55%,#0a2e0a 100%)', accent: '#43a047', accentLt: '#81c784', card: '#ffffff', text: '#0a1f0a', muted: '#4a7a4a', fieldBg: '#f0fff0', fieldBdr: '#b2dfb2', border: '#43a047' },
    rose:      { bg: 'linear-gradient(160deg,#1a0010 0%,#880e4f 55%,#2d0020 100%)', accent: '#e91e8c', accentLt: '#f48fb1', card: '#ffffff', text: '#2d0018', muted: '#7a3a5a', fieldBg: '#fff0f6', fieldBdr: '#f5b8d4', border: '#e91e8c' },
    orange:    { bg: 'linear-gradient(160deg,#1a0800 0%,#bf360c 55%,#2a0e00 100%)', accent: '#ff9800', accentLt: '#ffcc02', card: '#ffffff', text: '#1a0800', muted: '#7a4a20', fieldBg: '#fff8f0', fieldBdr: '#ffcc80', border: '#ff9800' },
    cyberpunk: { bg: 'linear-gradient(160deg,#050005 0%,#0f000f 55%,#000510 100%)', accent: '#ff00ff', accentLt: '#00ffff', card: '#0d0d0d', text: '#e0e0e0', muted: '#888888', fieldBg: '#1a001a', fieldBdr: '#440044', border: '#ff00ff' },
  };

  themes = [
    { key: 'dark',      label: 'Tamna',      preview: 'linear-gradient(135deg, #0d1b3e, #1a2a4a)' },
    { key: 'blue',      label: 'Plava',       preview: 'linear-gradient(135deg, #1565c0, #42a5f5)' },
    { key: 'green',     label: 'Zelena',      preview: 'linear-gradient(135deg, #1b5e20, #43a047)' },
    { key: 'rose',      label: 'Roza',        preview: 'linear-gradient(135deg, #880e4f, #e91e8c)' },
    { key: 'orange',    label: 'Narandžasta', preview: 'linear-gradient(135deg, #bf360c, #ff9800)' },
    { key: 'cyberpunk', label: 'Cyberpunk',   preview: 'linear-gradient(135deg, #0a0a0a, #ff00ff)' },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    const saved = localStorage.getItem('activeTheme') || 'dark';
    this.applyTheme(saved);
  }

  selectTheme(key: string): void {
    this.applyTheme(key);
  }

  applyTheme(key: string): void {
    this.theme = key;
    const t = this.themeMap[key] || this.themeMap['dark'];
    this.bgStyle        = t.bg;
    this.accentColor    = t.accent;
    this.accentLight    = t.accentLt;
    this.cardBg         = t.card;
    this.cardBorderColor= t.border;
    this.textColor      = t.text;
    this.textMuted      = t.muted;
    this.fieldBg        = t.fieldBg;
    this.fieldBorder    = t.fieldBdr;

    // I dalje postavljamo data-theme za globalne stilove
    document.documentElement.setAttribute('data-theme', key);
    document.body.setAttribute('data-theme', key);
  }

  submit(): void {
    this.error = '';
    if (!this.name || !this.email || !this.password) { this.error = 'Molimo popunite sva polja'; return; }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) { this.error = 'Unesite ispravnu email adresu'; return; }
    if (this.password.length < 6) { this.error = 'Lozinka mora imati najmanje 6 karaktera'; return; }
    this.loading = true;
    setTimeout(() => {
      try {
        const userData = { name: this.name, email: this.email, password: this.password, theme: this.theme, registeredAt: new Date().toISOString() };
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('activeTheme', this.theme);
        this.loading = false;
        this.showSuccessMessage();
        this.name = ''; this.email = ''; this.password = ''; this.passwordStrength = 0;
        setTimeout(() => { this.router.navigate(['/login']).catch(() => { window.location.href = '/login'; }); }, 2000);
      } catch (err) {
        this.error = 'Došlo je do greške tokom registracije';
        this.loading = false;
      }
    }, 1000);
  }

  private showSuccessMessage(): void {
    const el = document.createElement('div');
    el.innerHTML = `<div style="position:fixed;top:20px;right:20px;background:#2e7d32;color:white;padding:15px 20px;border-radius:8px;z-index:9999;box-shadow:0 4px 12px rgba(0,0,0,0.2);font-family:Inter,sans-serif;font-size:14px;">✓ Registracija uspješna! Preusmjeravanje na prijavu...</div>`;
    document.body.appendChild(el);
    setTimeout(() => { if (el.parentNode) el.parentNode.removeChild(el); }, 2200);
  }

  goLogin(): void { this.router.navigate(['/login']); }
  goBack(): void  { this.router.navigate(['/']); }

  checkPasswordStrength(): void {
    if (!this.password) { this.passwordStrength = 0; return; }
    let s = 0;
    if (this.password.length >= 8)            s += 25;
    if (/[A-Z]/.test(this.password))          s += 25;
    if (/[0-9]/.test(this.password))          s += 25;
    if (/[^A-Za-z0-9]/.test(this.password))   s += 25;
    this.passwordStrength = s;
  }

  getStrengthText(): string {
    if (this.passwordStrength < 25) return 'Slaba';
    if (this.passwordStrength < 50) return 'Srednja';
    if (this.passwordStrength < 75) return 'Dobra';
    return 'Jaka';
  }
}
