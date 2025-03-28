import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { TaskService } from '../../../services/task/task.service';
import { Task } from '../../../models/task.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  imports: [FormsModule, CommonModule, RouterLink]
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];  // Lista de tareas
  token: string = '';  // Aquí se guardará el token
  alertDeleteVisible: boolean = false;  // Bandera para mostrar la alerta de tarea eliminada

  constructor(
    private taskService: TaskService,
    private authService: AuthService,  // Servicio de autenticación
    private router: Router
  ) { }

  ngOnInit(): void {
    this.token = this.authService.getToken();  // Obtén el token del servicio de autenticación
    this.getAllTasks();  // Carga las tareas cuando el componente se inicie
  }

  getAllTasks(): void {
    this.taskService.getTasks(this.token).subscribe({
      next: (data) => {
        this.tasks = data;
      },
      error: (e) => {
        console.error('Error al cargar las tareas', e);
      }
    });
  }

  deleteTask(id: string): void {
    this.taskService.deleteTask(id, this.token).subscribe({
      next: () => {
        this.alertDeleteVisible = true;  // Muestra la alerta de tarea eliminada
        // Se elimina la tarea de la lista
        this.tasks = this.tasks.filter(task => task.id !== id);
        setTimeout(() => {
          this.alertDeleteVisible = false;  // Oculta la alerta después de 2 segundos
        }, 2000);
      },
      error: (e) => {
        console.error('Error al eliminar la tarea', e);
      }
    });
  }

  // Navegar a la edición de una tarea, enviando el objeto sin mostrarlo en la URL
  goToEdit(task: any) {
    this.router.navigate(['/tasks/edit'], { state: { taskData: task } });
  }

  logout(): void {
    this.authService.logout();  // Llamar al método logout
    this.router.navigate(['/login']);  // Redirigir al login después de cerrar sesión
  }
}
