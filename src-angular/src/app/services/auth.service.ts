import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public usuarioSubject = new BehaviorSubject<Usuario | null>(this.getUsuarioFromLocalStorage());
  usuario$ = this.usuarioSubject.asObservable();
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isTokenInLocalStorage());

  private apiUrl = 'http://localhost:8081/authenticate/signin';
  private apiUrlSignup = 'http://localhost:8081/authenticate/signup';
  private userDetailsUrl = 'http://localhost:8081/api/usuarios/detalles';

  constructor(private http: HttpClient, private tokenService: TokenService, private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {}

  get authenticationState(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  getUsuarioId(): number | null {
    if (isPlatformBrowser(this.platformId)) {
      const usuarioId = sessionStorage.getItem('usuarioId');
      return usuarioId ? parseInt(usuarioId, 10) : null;
    }
    return null;
  }

  private isTokenInLocalStorage(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!sessionStorage.getItem('token');
    }
    return false;
  }

  private getUsuarioFromLocalStorage(): Usuario | null {
    if (isPlatformBrowser(this.platformId)) {
      const user = sessionStorage.getItem('usuario');
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  private saveUsuarioToLocalStorage(usuario: Usuario) {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem('usuario', JSON.stringify(usuario));
      sessionStorage.setItem('usuarioId', usuario.id.toString());
    }
  }

  private removeUsuarioFromLocalStorage() {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem('usuario');
      sessionStorage.removeItem('usuarioId');
    }
  }

  login(user: { email: string; password: string }): Observable<{ token: string; roles: string[] }> {
    return this.http.post<any>(this.apiUrl, user).pipe(
      map((response: { token: string; roles: string[] }) => {
        if (response && response.token && response.roles) {
          this.tokenService.setUserDetails(response.token, response.roles);
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('token', response.token); // Asegúrate de que el token se guarde en localStorage
          }
          this.isAuthenticatedSubject.next(true);
          this.updateUsuarioFromToken();
          return response;
        } else {
          throw new Error('Token o roles no presentes en la respuesta');
        }
      }),
      catchError(error => this.handleErrorLogin(error))
    );
  }

  private handleErrorLogin(error: HttpErrorResponse) {
    console.error('Error en el login:', error);
    if (error.error instanceof ErrorEvent) {
      return throwError(() => new Error('Error: ' + error.error.message));
    } else {
      const errorMessage = error.error?.message || 'Error en el login';
      return throwError(() => new Error(errorMessage));
    }
  }

  isAuthenticated(): boolean {
    const token = this.tokenService.getToken();
    const isAuthenticated = token !== null;
    if (isAuthenticated !== this.isAuthenticatedSubject.getValue()) {
      this.isAuthenticatedSubject.next(isAuthenticated);
      if (isAuthenticated) {
        this.updateUsuarioFromToken();
      }
    }
    return isAuthenticated;
  }

  hasRole(role: string): boolean {
    let roles = this.tokenService.getRoles();
    console.log('Roles del usuario:', roles);  // Agregar este log para depuración
    return roles ? roles.includes(role) : false;
  }

  logout() {
    this.tokenService.removeUserDetails();
    this.isAuthenticatedSubject.next(false);
    this.removeUsuarioFromLocalStorage();
    this.router.navigate(['/']);
  }

  signup(user: Usuario): Observable<{ token: string; roles: string[] }> {
    return this.http.post<any>(this.apiUrlSignup, user).pipe(
      map(response => {
        if (response && response.token) {
          this.tokenService.setUserDetails(response.token, response.roles);
          return response;
        } else {
          throw new Error('Respuesta de registro no válida');
        }
      }),
      catchError(error => this.handleError(error))
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error en el registro:', error);
    if (error.error instanceof ErrorEvent) {
      return throwError(() => new Error('Error: ' + error.error.message));
    } else {
      const errorMessage = error.error?.message || 'Error en el registro';
      return throwError(() => new Error(errorMessage));
    }
  }

  private updateUsuarioFromToken() {
    const email = this.tokenService.getUserEmail();
    if (email) {
      console.log('Email obtenido del token:', email);
      this.getUserDetails(email).subscribe(
        (user: any) => {
          const usuario: Usuario = {
            id: user.id,
            nombreUsuario: user.nombreUsuario,
            apellidoUsuario: user.apellidoUsuario,
            email: user.email,
            password: user.password,
            roles: user.roles
          };
          console.log('Usuario obtenido del backend:', usuario);
          this.usuarioSubject.next(usuario);
          this.saveUsuarioToLocalStorage(usuario);
        },
        (error) => {
          console.error('Error al obtener los detalles del usuario:', error);
        }
      );
    }
  }

  getUserDetails(email: string): Observable<Usuario> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Usuario>(`${this.userDetailsUrl}?email=${email}`, { headers }).pipe(
      map(response => {
        console.log('Respuesta del backend:', response);
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error obteniendo detalles del usuario:', error);
        return throwError(() => new Error('Error obteniendo detalles del usuario'));
      })
    );
  }
}
