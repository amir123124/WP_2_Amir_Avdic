import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  loading = false;

  constructor(private router: Router) {}

  submit(): void {
    this.error = '';

    if (!this.email.trim() || !this.password.trim()) {
      this.error = 'Molimo unesite email i lozinku';
      return;
    }

    this.loading = true;

    const userData = localStorage.getItem('user');

    if (!userData) {
      setTimeout(() => {
        this.error = 'Nalog nije pronađen. Molimo registrujte se prvo.';
        this.loading = false;
      }, 1000);
      return;
    }

    setTimeout(() => {
      try {
        const user = JSON.parse(userData);

        const emailMatch = user.email.toLowerCase() === this.email.toLowerCase();
        const passwordMatch = user.password === this.password;

        if (emailMatch && passwordMatch) {
          // Spremi login status
          sessionStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('loggedIn', 'true');

          const userInfo = { email: this.email, name: user.name || 'User' };
          sessionStorage.setItem('currentUser', JSON.stringify(userInfo));
          localStorage.setItem('currentUser', JSON.stringify(userInfo));

          // Primijeni temu
          const theme = user.theme || 'dark';
          localStorage.setItem('activeTheme', theme);
          document.documentElement.setAttribute('data-theme', theme);

          this.loading = false;

          // Koristimo Angular Router - NE window.location.href
          this.router.navigateByUrl('/dashboard');

        } else {
          this.error = 'Pogrešan email ili lozinka';
          this.loading = false;
        }
      } catch (e) {
        this.error = 'Greška u podacima naloga';
        this.loading = false;
        localStorage.removeItem('user');
      }
    }, 1000);
  }

  goRegister(): void { this.router.navigate(['/register']); }
  goBack(): void { this.router.navigate(['/']); }
}
