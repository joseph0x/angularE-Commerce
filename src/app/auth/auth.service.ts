import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { LoginForm, RegisterForm } from '../types/authentication';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}
  isAuthenticated: boolean = false;
  isLoading: boolean = false;
  login(form: LoginForm) {
    if (this.isLoading) return;
    this.isLoading = true;
    const auth = getAuth();
    signInWithEmailAndPassword(auth, form.email, form.password)
      .then((userCredential) => {
        // Signed in
        // alert('Login Successful');
        this.isAuthenticated = true;
        this.router.navigate(['']);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert('Credentials doesn`t match our record');
        this.isAuthenticated = false;
      })
      .finally(() => (this.isLoading = false));
  }
  passwordMatched: boolean = true;

  register(form: RegisterForm) {
    if (this.isLoading) return;
    this.isLoading = true;
    // console.log(this.form);
    if (form.password !== form.confirmPassword) {
      this.passwordMatched = false;
      return;
    }
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, form.email, form.password)
      .then((userCredential) => {
        // Signed in
        // const user = userCredential.user;
        // console.log(userCredential);
        this.isAuthenticated = true;

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        this.isAuthenticated = false;
        // this.router.navigate(['']);
      })
      .finally(() => (this.isLoading = false));
  }
  logout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        this.router.navigate(['login']);
        this.isAuthenticated = false;
      })
      .catch((error) => {
        // An error happened.
      });
  }
}
