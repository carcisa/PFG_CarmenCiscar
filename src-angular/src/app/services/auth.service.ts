import { Rol, Usuario } from './../models/usuario.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TokenService } from './token.service';

import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
   usuario: Usuario = { email: '', password: '', rol: [] };
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  private apiUrl = 'http://localhost:8080/authenticate/signin';
  private apiUrlSignup = 'http://localhost:8080/authenticate/signup';


  constructor(private http: HttpClient,
    private tokenService: TokenService,
    private router: Router
  ) { }

  //devuelve un observable, que emite el estado de autenticación
  get authenticationState(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  login(user: { email: string, password: string }): Observable<{ token: string, roles: string[] }> {
    return this.http.post<any>(this.apiUrl, user).pipe(
      map((response: { token: string, roles: string[] }) => {
        if (response && response.token && response.roles) {
          // Convertir los roles de string a Rol
          const rolesConverted: Rol[] = response.roles.map(role => {
            if (Object.values(Rol).includes(role as Rol)) {
              return role as Rol;
            } else {
              throw new Error(`Rol desconocido: ${role}`);
            }
          });

          // Almacenar detalles del usuario
          this.tokenService.setUserDetails(response.token, rolesConverted);
          this.usuario = { email: user.email, password: user.password, rol: rolesConverted };
          console.log(this.usuario);

          // Emite el nuevo estado de autenticación
          this.isAuthenticatedSubject.next(true);
          return response;
        } else {
          throw new Error('Token o roles no presentes en la respuesta');
        }
      }),
      catchError(error => {
        console.error('Error durante el inicio de sesión:', error);
        return throwError(() => new Error('Error durante el inicio de sesión'));
      })
    );
  }



  isAuthenticated(): boolean {
    const token = this.tokenService.getToken();
    const isAuthenticated = token !== null;
    //comprueba que el usuario esta autenticado
    if (isAuthenticated !== this.isAuthenticatedSubject.getValue()) {
      this.isAuthenticatedSubject.next(isAuthenticated);
    }
    return isAuthenticated;
  }



  hasRole(role: string): boolean {
    //verifica si el usuario tiene un rol especifico consultando los roles almacenados en TokenServices
    let roles = this.tokenService.getRoles();
    return roles ? roles.includes(role) : false;
  }


  logout() {
    this.tokenService.removeUserDetails();
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/']);
}

signup(usuario: Usuario): Observable<{ token: string, roles: string[] }> {
  return this.http.post<any>(`${this.apiUrlSignup}`, usuario).pipe(
    map(response => {
      if (response && response.token) {
        this.tokenService.setUserDetails(response.token, response.roles);
        return response;
      } else {
        throw new Error('Respuesta de registro no válida');
      }
    }),
    catchError(error => {
      console.error('Error en el registro:', error);
      return throwError(() => new Error('Error en el registro'));
    })
  );
}


}
