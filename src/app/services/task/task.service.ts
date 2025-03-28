import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';  // Importa firstValueFrom
import { environment } from '../../../environments/environment';  // Importa environment

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = `${environment.apiUrl}/tasks`;  // Utiliza la URL desde environment

  constructor(private http: HttpClient) { }

  getHeaders(token: string): HttpHeaders {
    return new HttpHeaders(
      {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`  // Agrega el token al header
      }
    )
  }

  getTasks(token: string): Observable<any[]> {
    const headers  = this.getHeaders(token);

    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  createTask(task: any, token: string): Observable<any> {
    const headers  = this.getHeaders(token);

    return this.http.post<any>(this.apiUrl, task, { headers });
  }

  updateTask(id: String, task: any, token: string): Observable<any> {
    const headers  = this.getHeaders(token);

    return this.http.put<any>(`${this.apiUrl}/${id}`, task, { headers });
  }

  deleteTask(id: string, token: string): Observable<any> {
    const headers  = this.getHeaders(token);

    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers });
  }
}