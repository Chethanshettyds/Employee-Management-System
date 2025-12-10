import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="register-container">
      <div class="register-card">
        <div class="logo-section">
          <h1>Create Account</h1>
          <p>Join Employee Management System</p>
        </div>

        <form (ngSubmit)="onRegister()" #registerForm="ngForm">
          <div class="form-row">
            <div class="form-group">
              <label>First Name</label>
              <input 
                type="text" 
                [(ngModel)]="userData.first_name" 
                name="first_name"
                required
                placeholder="First name"
              >
            </div>

            <div class="form-group">
              <label>Last Name</label>
              <input 
                type="text" 
                [(ngModel)]="userData.last_name" 
                name="last_name"
                required
                placeholder="Last name"
              >
            </div>
          </div>

          <div class="form-group">
            <label>Username</label>
            <input 
              type="text" 
              [(ngModel)]="userData.username" 
              name="username"
              required
              placeholder="Choose a username"
            >
          </div>

          <div class="form-group">
            <label>Email</label>
            <input 
              type="email" 
              [(ngModel)]="userData.email" 
              name="email"
              required
              placeholder="your@email.com"
            >
          </div>

          <div class="form-group">
            <label>Password</label>
            <input 
              type="password" 
              [(ngModel)]="userData.password" 
              name="password"
              required
              minlength="6"
              placeholder="Minimum 6 characters"
            >
          </div>

          <div class="error-message" *ngIf="errorMessage">
            {{ errorMessage }}
          </div>

          <div class="success-message" *ngIf="successMessage">
            {{ successMessage }}
          </div>

          <button type="submit" class="btn-primary" [disabled]="!registerForm.valid || loading">
            {{ loading ? 'Creating Account...' : 'Create Account' }}
          </button>
        </form>

        <div class="login-link">
          Already have an account? <a routerLink="/login">Sign in</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .register-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }

    .register-card {
      background: white;
      border-radius: 12px;
      padding: 40px;
      width: 100%;
      max-width: 500px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.2);
    }

    .logo-section {
      text-align: center;
      margin-bottom: 30px;
    }

    .logo-section h1 {
      color: #333;
      margin: 0 0 10px 0;
      font-size: 28px;
    }

    .logo-section p {
      color: #666;
      margin: 0;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-group label {
      display: block;
      margin-bottom: 8px;
      color: #333;
      font-weight: 500;
    }

    .form-group input {
      width: 100%;
      padding: 12px;
      border: 2px solid #e0e0e0;
      border-radius: 6px;
      font-size: 14px;
      transition: border-color 0.3s;
    }

    .form-group input:focus {
      outline: none;
      border-color: #667eea;
    }

    .btn-primary {
      width: 100%;
      padding: 14px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s;
    }

    .btn-primary:hover:not(:disabled) {
      transform: translateY(-2px);
    }

    .btn-primary:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .error-message {
      background: #fee;
      color: #c33;
      padding: 12px;
      border-radius: 6px;
      margin-bottom: 20px;
      font-size: 14px;
    }

    .success-message {
      background: #efe;
      color: #3c3;
      padding: 12px;
      border-radius: 6px;
      margin-bottom: 20px;
      font-size: 14px;
    }

    .login-link {
      text-align: center;
      margin-top: 20px;
      color: #666;
    }

    .login-link a {
      color: #667eea;
      text-decoration: none;
      font-weight: 600;
    }

    .login-link a:hover {
      text-decoration: underline;
    }
  `]
})
export class RegisterComponent {
  userData = {
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: ''
  };
  errorMessage = '';
  successMessage = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onRegister(): void {
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.register(this.userData).subscribe({
      next: () => {
        this.successMessage = 'Account created successfully! Redirecting...';
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 2000);
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error.error?.error || 'Registration failed. Please try again.';
      }
    });
  }
}
