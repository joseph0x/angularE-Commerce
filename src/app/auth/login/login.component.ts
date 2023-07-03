import { Component, OnInit } from '@angular/core';
import { LoginForm } from 'src/app/types/authentication';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {}
  constructor(private authService: AuthService) {}
  // email: string = '';
  form: LoginForm = {
    email: '',
    password: '',
  };

  submit() {
    // alert(this.form);

    this.authService.login(this.form);
  }
  isLoading() {
    return this.authService.isLoading;
  }
}
