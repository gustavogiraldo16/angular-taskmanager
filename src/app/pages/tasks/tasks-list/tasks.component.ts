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
  filterStatus: string = ''; // Filtro por estado
  filterPriority: string = ''; // Filtro por prioridad
  filteredTasks: Task[] = []; // Tareas filtradas

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
        this.applyFilters();
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
        this.applyFilters();  // Aplica los filtros después de eliminar la tarea
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

  onFilterChange(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredTasks = this.tasks.filter(task => {
      const statusMatch = this.filterStatus ? task.status === this.filterStatus : true;
      const priorityMatch = this.filterPriority ? task.priority === this.filterPriority : true;
      return statusMatch && priorityMatch;
    });
  }

}
