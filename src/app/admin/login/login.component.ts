import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  isRegister: boolean = false;
  loginObj: any = {
    username: '',
    password: '',
  };
  constructor(private router: Router) {}

  onLogin() {
    if (this.loginObj.username && this.loginObj.password) {
      this.router.navigateByUrl('/dashboard');
    } else {
      alert('wrong credentials');
    }
  }

  onRegister() {
    this.isRegister = !this.isRegister;
  }
}
