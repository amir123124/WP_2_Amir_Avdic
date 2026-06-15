import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// Ukloni ovaj import privremeno
// import { AuthService } from './auth.service';
import { FirestoresService } from './firestore.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './app.html',
    styleUrls: ['./app.css']
})
export class App {
    title = signal('AngularFirebase');
    currentUserEmail = signal<string | null>(null);

    constructor(
        // Ukloni authService privremeno
        // private authService: AuthService,
        private firestoreService: FirestoresService
    ) {
        console.log('App constructor');
    }

    register() {
        console.log('Register clicked');
    }

    login() {
        console.log('Login clicked');
    }

    loginGoogle() {
        console.log('Google login clicked');
    }

    logout() {
        console.log('Logout clicked');
    }

    async addTestDoc() {
        console.log('Add test doc clicked');
    }
}