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

  constructor(private http: HttpClient, private router: Router) {}

  // Redirige al login si la respuesta es no autorizada
  private isNoAutorizado(e: HttpErrorResponse): boolean {
    if (e.status === 401 || e.status === 403) {
      this.router.navigate(['/login']);
      return true;
    }
    return false;
  }

  // Devuelve los detalles del usuario
  devolverUsuario(token: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}miusuario`, { headers: this.getHeaders() }).pipe(
      catchError((e) => {
        this.isNoAutorizado(e);
        return throwError(() => new Error('Unauthorized or forbidden access'));
      })
    );
  }

  // Configura los encabezados de las solicitudes HTTP
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

  // Crea un nuevo usuario
  createUser(user: UserToSend): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}createUser`, user, { headers: this.getHeaders() }).pipe(
      catchError((e: HttpErrorResponse) => {
        return throwError(() => new Error('Error creando usuario'));
      })
    );
  }

  // Crea un nuevo usuario administrador
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

  // Maneja errores de las solicitudes HTTP
  private handleError(error: HttpErrorResponse) {
    console.error('Error:', error);
    const errorMessage = error.error?.message || 'Error del servidor';
    return throwError(() => new Error(errorMessage));
  }

  // Añade una actividad a los favoritos del usuario
  addActividadFavorita(token: string, usuarioId: number, actividadId: number): Observable<any> {
    const url = `${this.apiUrl}${usuarioId}/actividades`;
    return this.http.post<any>(url, { id: actividadId }, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // Obtiene las actividades favoritas del usuario
  getActividadesFavoritas(token: string, usuarioId: number): Observable<Actividad[]> {
    const url = `${this.apiUrl}${usuarioId}/actividades`;
    return this.http.get<Actividad[]>(url, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // Elimina una actividad de los favoritos del usuario
  removeActividadFavorita(token: string, usuarioId: number, actividadId: number): Observable<any> {
    const url = `${this.apiUrl}${usuarioId}/favoritos/${actividadId}`;
    return this.http.delete<any>(url, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // Guarda las actividades favoritas en localStorage
  saveActividadesFavoritasToLocalStorage(actividades: Actividad[]): void {
    localStorage.setItem('actividadesFavoritas', JSON.stringify(actividades));
  }

  // Carga las actividades favoritas desde localStorage
  loadActividadesFavoritasFromLocalStorage(): Actividad[] {
    const actividades = localStorage.getItem('actividadesFavoritas');
    return actividades ? JSON.parse(actividades) : [];
  }
}
