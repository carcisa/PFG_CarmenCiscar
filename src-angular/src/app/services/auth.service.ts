import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usuario: Usuario = { firstName: '', lastName: '', email: '', password: '' };
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  private apiUrl = 'http://localhost:8081/authenticate/signin';
  private apiUrlSignup = 'http://localhost:8081/authenticate/signup';

  constructor(private http: HttpClient, private tokenService: TokenService, private router: Router) {}

  // Devuelve un observable que emite el estado de autenticación
  get authenticationState(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  // // Envia una solicitud POST con los datos del usuario
  // login(user: { email: string; password: string }): Observable<{ token: string; roles: string[] }> {
  //   return this.http.post<any>(this.apiUrl, user).pipe(
  //     map((response: { token: string; roles: string[] }) => {
  //       // Si tiene éxito, se almacena
  //       if (response && response.token && response.roles) {
  //         // Almacenar detalles del usuario
  //         this.tokenService.setUserDetails(response.token, response.roles);
  //         // Se actualiza el estado de autenticación
  //         this.usuario = { firstName: '', lastName: '', email: user.email, password: user.password };
  //         console.log(this.usuario);
  //         // Emite el nuevo estado de autenticación
  //         this.isAuthenticatedSubject.next(true);
  //         return response;
  //       } else {
  //         throw new Error('Token o roles no presentes en la respuesta');
  //       }
  //     }),
  //     catchError(error => {
  //       console.error('Error en el login:', error);
  //       return throwError(() => new Error('Error en el login'));
  //     })
  //   );
  // }

  login(user: { email: string; password: string }): Observable<{ token: string; roles: string[] }> {
    return this.http.post<any>(this.apiUrl, user).pipe(
      map((response: { token: string; roles: string[] }) => {
        if (response && response.token && response.roles) {
          this.tokenService.setUserDetails(response.token, response.roles);
          this.isAuthenticatedSubject.next(true);
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
    // Comprueba que el usuario está autenticado
    if (isAuthenticated !== this.isAuthenticatedSubject.getValue()) {
      this.isAuthenticatedSubject.next(isAuthenticated);
    }
    return isAuthenticated;
  }

  hasRole(role: string): boolean {
    // Verifica si el usuario tiene un rol específico consultando los roles almacenados en TokenService
    let roles = this.tokenService.getRoles();
    return roles ? roles.includes(role) : false;
  }

  logout() {
    this.tokenService.removeUserDetails();
    this.isAuthenticatedSubject.next(false);
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
      // Error del cliente
      return throwError(() => new Error('Error: ' + error.error.message));
    } else {
      // Error del servidor
      const errorMessage = error.error?.message || 'Error en el registro';
      return throwError(() => new Error(errorMessage));
    }
  }

}
