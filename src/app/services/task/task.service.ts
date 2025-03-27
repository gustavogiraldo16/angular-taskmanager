import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';  // Importa firstValueFrom
import { environment } from '../../../environments/environment';  // Importa environment

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = `${environment.apiUrl}/tasks`;  // Utiliza la URL desde environment

  constructor(private http: HttpClient) {}

  getTasks(token: string): Observable<any[]> {
    let header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${token}`)
    }
    return this.http.get<any[]>(this.apiUrl, header);
  }
}