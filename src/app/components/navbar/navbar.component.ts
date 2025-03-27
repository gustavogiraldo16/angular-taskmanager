import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  get isAuthenticated(): boolean {
    return !!localStorage.getItem('token');  // Verifica si hay token en localStorage
  }

  constructor(private authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout();  // Llamar al método logout
    this.router.navigate(['/login']);  // Redirigir al login después de cerrar sesión
  }
}