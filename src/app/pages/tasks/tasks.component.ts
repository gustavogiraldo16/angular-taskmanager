import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { TaskService } from '../../services/task/task.service';
import { Task } from '../../models/task.model';
import { TaskNew } from '../../models/task-new.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  imports: [FormsModule, CommonModule]
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];  // Lista de tareas
  saveTask: Task = {  // Inicializamos un objeto para el formulario de edición
    id: '',
    title: '',
    description: '',
    status: 'PENDING',
    priority: 'LOW',
    dueDate: '',
    user_id: ''
  };
  newTask: TaskNew = {  // Inicializamos un objeto para el formulario de creación
    title: '',
    description: '',
    status: 'PENDING',
    priority: 'LOW',
    dueDate: '',
    user_id: ''
  };
  token: string = '';  // Aquí se guardará el token

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

  createTask(): void {
    // this.taskService.createTask(this.newTask, this.token).subscribe({
    //   next: () => {
    //   },
    //   error: (e) => {
    //     console.error('Error al crear la tarea', e);
    //   }
    // });
  }

  editTask(task: Task): void {
    this.saveTask = task;  // Asigna la tarea a editar al objeto saveTask
  }

  updateTask(): void {
    // this.taskService.updateTask(this.saveTask, this.token).subscribe({
    //   next: () => {
    //   },
    //   error: (e) => {
    //     console.error('Error al editar la tarea', e);
    //   }
    // });
  }

  deleteTask(id: string): void {
    // this.taskService.deleteTask(task.id, this.token).subscribe({
    //   next: () => {
    //   },
    //   error: (e) => {
    //     console.error('Error al eliminar la tarea', e);
    //   }
    // });
  }

  logout(): void {
    this.authService.logout();  // Llamar al método logout
    this.router.navigate(['/login']);  // Redirigir al login después de cerrar sesión
  }
}
