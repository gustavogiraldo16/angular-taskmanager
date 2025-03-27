import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'tasks', component: TasksComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' }, // Redirecciona cualquier ruta no encontrada al login por ahora
];
