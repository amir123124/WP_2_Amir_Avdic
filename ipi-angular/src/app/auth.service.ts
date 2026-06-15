import { Injectable } from '@angular/core';
import { Auth, User, onAuthStateChanged, signInWithEmailAndPassword,
    createUserWithEmailAndPassword, signOut, GoogleAuthProvider,
    signInWithPopup } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: "root" }) 
export class AuthService {
    
    private currentUserSubject = new BehaviorSubject<User | null>(null);
    
    currentUser$ = this.currentUserSubject.asObservable();

    constructor(private auth: Auth) {
    
        onAuthStateChanged(this.auth, (user) => this.currentUserSubject.next(user));
    }


    signUp(email: string, password: string) {
        return createUserWithEmailAndPassword(this.auth, email, password);
    }

 
    signInEmail(email: string, password: string) {
        return signInWithEmailAndPassword(this.auth, email, password);
    }

    
    async signInGoogle() {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(this.auth, provider);
    }

  
    signOutUser() {
        return signOut(this.auth);
    }

    
    getCurrentUser(): User | null {
        return this.auth.currentUser;
    }
}