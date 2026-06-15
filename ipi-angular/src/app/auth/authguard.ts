import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    console.log('🛡️ AuthGuard checking authentication...');
    
    const loggedIn = localStorage.getItem('loggedIn');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const sessionLoggedIn = sessionStorage.getItem('isLoggedIn');
    
    console.log('AuthGuard - Storage values:', {
      loggedIn: loggedIn,
      isLoggedIn: isLoggedIn,
      sessionLoggedIn: sessionLoggedIn
    });
    
    const isAuthenticated = 
      loggedIn === 'true' || 
      isLoggedIn === 'true' || 
      sessionLoggedIn === 'true';
    
    if (isAuthenticated) {
      console.log('✅ AuthGuard: User is authenticated, access granted');
      return true;
    } else {
      console.log('❌ AuthGuard: User is NOT authenticated, redirecting to login');
      this.router.navigate(['/login']);
      return false;
    }
  }
}