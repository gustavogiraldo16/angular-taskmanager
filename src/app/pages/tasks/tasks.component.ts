import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { NavbarComponent } from "../../components/navbar/navbar.component";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  imports: [NavbarComponent]
})
export class TasksComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout();  // Llamar al método logout
    this.router.navigate(['/login']);  // Redirigir al login después de cerrar sesión
  }
}
