import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../services/task/task.service';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './tasks-form.component.html',
  styleUrl: './tasks-form.component.css'
})
export class TasksFormComponent implements OnInit {
  @Input() task: any = {
    title: '',
    description: '',
    status: 'PENDING',
    priority: 'LOW',
    dueDate: new Date().toISOString().split('T')[0], // Fecha actual
    user_id: ''
  };

  id: string = '';  // ID de la tarea
  token: string = '';  // Aquí se guardará el token
  alertCreateVisible: boolean = false;  // Bandera para mostrar la alerta de tarea creada
  alertUpdateVisible: boolean = false;  // Bandera para mostrar la alerta de tarea actualizada
  alertErrorVisible: boolean = false;  // Bandera para mostrar la alerta de error
  errorMessage: string = '';  // Mensaje de error

  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.token = this.authService.getToken();  // Obtén el token del servicio de autenticación
    const navState = history.state;
    if (navState.taskData) {
      this.id = navState.taskData.id;  // Asigna el ID de la tarea
      this.task.user_id = navState.taskData.user.id;  // Asigna el usuario de la tarea
      this.task = { ...navState.taskData };
    }
  }

  submitForm() {
    if (this.task.id) {
      this.updateTask();
    }
    else {
      this.createTask();
    }
    console.log('Task enviada:', this.task);
  }

  createTask(): void {
    this.clearAlerts();  // Limpia las alertas antes de crear la tarea
    this.taskService.createTask(this.task, this.token).subscribe({
      next: () => {
        this.alertCreateVisible = true;  // Muestra la alerta de tarea creada
        this.resetForm();  // Reinicia el formulario después de crear la tarea
        setTimeout(() => {
          this.router.navigate(['/tasks']); // Redirige después del login
        }, 3000);
      },
      error: (e) => {
        this.errorMessage = 'Error al crear la tarea';
        this.alertErrorVisible = true;  // Muestra la alerta de error
        console.error('Error al crear la tarea', e);
      }
    });
  }

  updateTask(): void {
    this.clearAlerts();  // Limpia las alertas antes de crear la tarea
    this.taskService.updateTask(this.id, this.task, this.token).subscribe({
      next: () => {
        this.alertUpdateVisible = true;  // Muestra la alerta de tarea actualizada
        setTimeout(() => {
          this.router.navigate(['/tasks']); // Redirige después del login
        }, 3000);
      },
      error: (e) => {
        this.errorMessage = 'Error al crear la tarea';
        this.alertErrorVisible = true;  // Muestra la alerta de error
      }
    });
  }

  clearTask(): void {
    this.task.user_id = this.task.user.user_id;
    delete this.task.user;  // Elimina el objeto user de la tarea antes de enviarla
    delete this.task.createdAt;  // Elimina el objeto createdAt de la tarea antes de enviarla
    delete this.task.updatedAt;  // Elimina el objeto updatedAt de la tarea antes de enviarla
    delete this.task.id;  // Elimina el objeto id de la tarea antes de enviarla
  }

  resetForm(): void {
    this.task = {
      title: '',
      description: '',
      status: 'PENDING',
      priority: 'LOW',
      dueDate: new Date().toISOString().split('T')[0], // Fecha actual
      user_id: ''
    };
  }

  clearAlerts(): void {
    this.alertCreateVisible = false;  // Oculta la alerta de tarea creada
    this.alertUpdateVisible = false;  // Oculta la alerta de tarea actualizada
    this.alertErrorVisible = false;  // Oculta la alerta de error
    this.errorMessage = '';  // Limpia el mensaje de error
  }
}
