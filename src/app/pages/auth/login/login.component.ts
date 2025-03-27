import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Todos los campos son obligatorios';
      return;
    }

    this.authService.login({ username: this.email, password: this.password }).subscribe({
      next: (response) => {
        console.log('Login exitoso:', response);
        localStorage.setItem('token', response.token); // Guarda el token
        this.router.navigate(['/tasks']); // Redirige después del login
      },
      error: () => {
        this.errorMessage = 'Credenciales incorrectas';
      }
    });
  }
}
