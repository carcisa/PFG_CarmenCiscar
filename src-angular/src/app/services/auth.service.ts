import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  usuario: Usuario = { email: '', password: '', roles: [] };
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  private apiUrl = 'http://localhost:8081/authenticate/signin';
  private apiUrlSignup = 'http://localhost:8081/authenticate/signup';


  constructor(private http: HttpClient,
    private tokenService: TokenService,
    private router: Router
  ) { }

  //devuelve un observable, que emite el estado de autenticación
  get authenticationState(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  //envia una solicitud POST con los datos del usuario
  login(user: { email: string, password: string }): Observable<{ token: string, roles: string[] }> {
    return this.http.post<any>(this.apiUrl, user).pipe(
      map((response: { token: string, roles: string[] }) => {
        //si tiene exito se almacena
        if (response && response.token && response.roles) {
          // Almacenar detalles del usuario
          this.tokenService.setUserDetails(response.token, response.roles);
          // Se actualiza el estado de autenticación
          this.usuario = { email: user.email, password: user.password, roles: response.roles };
          console.log(this.usuario);
          // Emite el nuevo estado de autenticación
          this.isAuthenticatedSubject.next(true);
          return response;
        } else {
          throw new Error('Token o roles no presentes en la respuesta');
        }
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

signup(user: Usuario): Observable<{ token: string, roles: string[] }> {
  return this.http.post<any>(`${this.apiUrlSignup}`, user).pipe(
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
