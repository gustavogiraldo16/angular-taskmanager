import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';  // Importa environment

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }

  logout(): void {
    localStorage.removeItem('token');  // Eliminar el token
  }

  register(userData: { name: string, email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, userData);
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }
}