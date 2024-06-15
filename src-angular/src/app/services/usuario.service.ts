import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { Actividad } from '../models/actividad.model';
import { UserToSend } from '../models/userToSend.model';

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
    return this.http.get<Usuario>(`${this.apiUrl}miusuario`, { headers: this.getHeaders() }).pipe(
      catchError((e) => {
        this.isNoAutorizado(e);
        return throwError(() => new Error('Unauthorized or forbidden access'));
      })
    );
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  getUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl, { headers: this.getHeaders() }).pipe(
      catchError((e: HttpErrorResponse) => {
        return throwError(() => new Error('Error al obtener usuarios'));
      })
    );
  }

  createUser(user: UserToSend): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}createUser`, user, { headers: this.getHeaders() }).pipe(
      catchError((e: HttpErrorResponse) => {
        return throwError(() => new Error('Error creando usuario'));
      })
    );
  }
  createUserAdmin(user: UserToSend): Observable<Usuario> {
    const url = `${this.apiUrl}admin/createUser`;
    return this.http.post<Usuario>(url, user, { headers: this.getHeaders() }).pipe(
      catchError((e: HttpErrorResponse) => {
        return throwError(() => new Error('Error al crear usuario administrador'));
      })
    );
  }

  updateUser(userId: number, user: UserToSend): Observable<Usuario> {
    const url = `${this.apiUrl}${userId}`;
    return this.http.put<Usuario>(url, user, { headers: this.getHeaders() }).pipe(
      catchError((e: HttpErrorResponse) => {
        return throwError(() => new Error('Error al actualizar usuario'));
      })
    );
  }

  deleteUser(userId: number): Observable<any> {
    const url = `${this.apiUrl}${userId}`;
    return this.http.delete<any>(url, { headers: this.getHeaders() }).pipe(
      catchError((e) => {
        return throwError(() => new Error('Error al eliminar usuario'));
      })
    );
  }
  private handleError(error: HttpErrorResponse) {
    console.error('Error actualizando el usuario:', error);
    if (error.error instanceof ErrorEvent) {
      return throwError(() => new Error('Error del lado del cliente: ' + error.error.message));
    } else {
      let errorMessage = 'Error del servidor';
      if (error.error) {
        errorMessage = error.error.message || errorMessage;
      }
      return throwError(() => new Error(errorMessage));
    }
  }

  // deleteUser(userId: number): Observable<any> {
  //   const url = `${this.apiUrl}${userId}`;
  //   return this.http.delete<any>(url, { headers: this.getHeaders() }).pipe(
  //     catchError((e) => {
  //       this.isNoAutorizado(e);
  //       return throwError(() => new Error('Error deleting user'));
  //     })
  //   );
  // }

  addActividadFavorita(token: string, usuarioId: number, actividadId: number): Observable<any> {
    const url = `${this.apiUrl}${usuarioId}/actividades`;
    return this.http.post<any>(url, { id: actividadId }, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  getActividadesFavoritas(token: string, usuarioId: number): Observable<Actividad[]> {
    const url = `${this.apiUrl}${usuarioId}/actividades`;
    return this.http.get<Actividad[]>(url, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  removeActividadFavorita(token: string, usuarioId: number, actividadId: number): Observable<any> {
    const url = `${this.apiUrl}${usuarioId}/favoritos/${actividadId}`;
    return this.http.delete<any>(url, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  saveActividadesFavoritasToLocalStorage(actividades: Actividad[]): void {
    localStorage.setItem('actividadesFavoritas', JSON.stringify(actividades));
  }

  loadActividadesFavoritasFromLocalStorage(): Actividad[] {
    const actividades = localStorage.getItem('actividadesFavoritas');
    return actividades ? JSON.parse(actividades) : [];
  }
}
