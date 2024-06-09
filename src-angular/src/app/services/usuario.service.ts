import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8081/api/usuarios/';

  constructor(private http: HttpClient, private router: Router) { }

  private isNoAutorizado(e: HttpErrorResponse): boolean {
    if (e.status === 401 || e.status === 403) {
      this.router.navigate(['/login']);
      return true;
    }
    return false;
  }

  devolverUsuario(token: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}miusuario`, { headers: this.getHeaders(token) }).pipe(
      catchError((e) => {
        this.isNoAutorizado(e);
        return throwError(() => new Error('Unauthorized or forbidden access'));
      })
    );
  }

  private getHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getUsers(token: string): Observable<any> {
    return this.http.get<any>(this.apiUrl, { headers: this.getHeaders(token) }).pipe(
      catchError((e) => {
        this.isNoAutorizado(e);
        return throwError(() => new Error('Unauthorized or forbidden access'));
      })
    );
  }

  createUser(token: string, user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user, { headers: this.getHeaders(token) }).pipe(
      catchError((e) => {
        this.isNoAutorizado(e);
        return throwError(() => new Error('Error creating user'));
      })
    );
  }

  // updateUser(token: string, userId: number, user: Usuario): Observable<Usuario> {
  //   const url = `${this.apiUrl}${userId}`;
  //   return this.http.put<Usuario>(url, user, { headers: this.getHeaders(token) }).pipe(
  //     catchError(this.handleError)
  //   );
  // }

  updateUser(token: string, userId: number, user: Usuario): Observable<Usuario> {
    const url = `${this.apiUrl}${userId}`;
    return this.http.put<Usuario>(url, user, { headers: this.getHeaders(token) }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error actualizando el usuario:', error);
    if (error.error instanceof ErrorEvent) {
      return throwError(() => new Error('Error del lado del cliente: ' + error.error.message));
    } else {
      return throwError(() => new Error('Error del servidor: ' + error.message));
    }
  }



  deleteUser(token: string, userId: number): Observable<any> {
    const url = `${this.apiUrl}${userId}`;
    return this.http.delete<any>(url, { headers: this.getHeaders(token) }).pipe(
      catchError((e) => {
        this.isNoAutorizado(e);
        return throwError(() => new Error('Error deleting user'));
      })
    );
  }
}
