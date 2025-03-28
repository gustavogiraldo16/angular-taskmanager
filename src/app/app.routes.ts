import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { TasksComponent } from './pages/tasks/tasks-list/tasks.component';
import { TasksFormComponent } from './pages/tasks/tasks-form/tasks-form.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'tasks',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: TasksComponent }, // Lista de tareas
      { path: 'create', component: TasksFormComponent }, // Crear tarea
      { path: 'edit', component: TasksFormComponent } // Editar tarea
    ]
  },
  { path: '**', redirectTo: 'login' }, // Redirecciona cualquier ruta no encontrada al login por ahora
];
