import { Component } from '@angular/core';
import { AuthService } from '../../auth.service'; // Assuming you have an auth service
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-password-reset-request',
  templateUrl: './password-reset-request.component.html',
  styleUrls: ['./password-reset-request.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class PasswordResetRequestComponent {
  email: string = '';
  userType: string = 'customer';
  loading: boolean = false;
  message: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.email || !this.userType) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    this.loading = true;
    this.authService.requestPasswordReset(this.email, this.userType).subscribe(
      (response) => {
        this.loading = false;
        this.message = response.message;
        this.errorMessage = '';
      },
      (error) => {
        this.loading = false;
        this.errorMessage = error.error?.message || 'An error occurred';
        this.message = '';
      }
    );
  }
}
