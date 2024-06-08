// import { Injectable } from '@angular/core';
// import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { BehaviorSubject } from 'rxjs';
// import { catchError, map } from 'rxjs/operators';

// import { TokenService } from './token.service';
// import { Router } from '@angular/router';
// import { Usuario } from '../models/usuario.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   private usuarioSubject = new BehaviorSubject<Usuario>({ firstName: '', lastName: '', email: '', password: '' });
//   usuario$ = this.usuarioSubject.asObservable();
//   private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);


//   private apiUrl = 'http://localhost:8081/authenticate/signin';
//   private apiUrlSignup = 'http://localhost:8081/authenticate/signup';
//   private userDetailsUrl = 'http://localhost:8081/api/usuarios/detalles';

//   constructor(private http: HttpClient, private tokenService: TokenService, private router: Router) {}

//   // Devuelve un observable que emite el estado de autenticación
//   get authenticationState(): Observable<boolean> {
//     return this.isAuthenticatedSubject.asObservable();
//   }

//   login(user: { email: string; password: string }): Observable<{ token: string; roles: string[] }> {
//     return this.http.post<any>(this.apiUrl, user).pipe(
//       map((response: { token: string; roles: string[] }) => {
//         if (response && response.token && response.roles) {
//           this.tokenService.setUserDetails(response.token, response.roles);
//           this.isAuthenticatedSubject.next(true);
//           this.updateUsuarioFromToken();
//           return response;
//         } else {
//           throw new Error('Token o roles no presentes en la respuesta');
//         }
//       }),
//       catchError(error => this.handleErrorLogin(error))
//     );
//   }

//   private handleErrorLogin(error: HttpErrorResponse) {
//     console.error('Error en el login:', error);
//     if (error.error instanceof ErrorEvent) {
//       return throwError(() => new Error('Error: ' + error.error.message));
//     } else {
//       const errorMessage = error.error?.message || 'Error en el login';
//       return throwError(() => new Error(errorMessage));
//     }
//   }


//   isAuthenticated(): boolean {
//     const token = this.tokenService.getToken();
//     const isAuthenticated = token !== null;
//     if (isAuthenticated !== this.isAuthenticatedSubject.getValue()) {
//       this.isAuthenticatedSubject.next(isAuthenticated);
//       if (isAuthenticated) {
//         this.updateUsuarioFromToken();
//       }
//     }
//     return isAuthenticated;
//   }

//   hasRole(role: string): boolean {
//     // Verifica si el usuario tiene un rol específico consultando los roles almacenados en TokenService
//     let roles = this.tokenService.getRoles();
//     return roles ? roles.includes(role) : false;
//   }

//   logout() {
//     this.tokenService.removeUserDetails();
//     this.isAuthenticatedSubject.next(false);
//     this.router.navigate(['/']);
//   }

//   signup(user: Usuario): Observable<{ token: string; roles: string[] }> {
//     return this.http.post<any>(this.apiUrlSignup, user).pipe(
//       map(response => {
//         if (response && response.token) {
//           this.tokenService.setUserDetails(response.token, response.roles);
//           return response;
//         } else {
//           throw new Error('Respuesta de registro no válida');
//         }
//       }),
//       catchError(error => this.handleError(error))
//     );
//   }

//   private handleError(error: HttpErrorResponse) {
//     console.error('Error en el registro:', error);
//     if (error.error instanceof ErrorEvent) {
//       // Error del cliente
//       return throwError(() => new Error('Error: ' + error.error.message));
//     } else {
//       // Error del servidor
//       const errorMessage = error.error?.message || 'Error en el registro';
//       return throwError(() => new Error(errorMessage));
//     }
//   }

//   private updateUsuarioFromToken() {
//     const email = this.tokenService.getUserEmail();
//     if (email) {
//       console.log('Email obtenido del token:', email);
//       this.getUserDetails(email).subscribe(
//         (user: any) => {
//           const usuario: Usuario = {
//             firstName: user.nombreUsuario, // Asigna el nombre de usuario al firstName
//             lastName: '', // Este campo parece no estar presente en la respuesta del backend
//             email: user.email,
//             password: user.password
//           };
//           console.log('Usuario obtenido del backend:', usuario);
//           this.usuarioSubject.next(usuario);
//         },
//         (error) => {
//           console.error('Error al obtener los detalles del usuario:', error);
//         }
//       );
//     }
//   }



//   getUserDetails(email: string): Observable<Usuario> {
//     const token = this.tokenService.getToken();
//     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//     return this.http.get<Usuario>(`${this.userDetailsUrl}?email=${email}`, { headers }).pipe(
//       map(response => {
//         console.log('Respuesta del backend:', response);
//         return response;
//       }),
//       catchError((error: HttpErrorResponse) => {
//         console.error('Error obteniendo detalles del usuario:', error);
//         return throwError(() => new Error('Error obteniendo detalles del usuario'));
//       })
//     );
//   }


// }


import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioSubject = new BehaviorSubject<Usuario>({ firstName: '', lastName: '', email: '', password: '' });
  usuario$ = this.usuarioSubject.asObservable();
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  private apiUrl = 'http://localhost:8081/authenticate/signin';
  private apiUrlSignup = 'http://localhost:8081/authenticate/signup';
  private userDetailsUrl = 'http://localhost:8081/api/usuarios/detalles';

  constructor(private http: HttpClient, private tokenService: TokenService, private router: Router) {}

  get authenticationState(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  login(user: { email: string; password: string }): Observable<{ token: string; roles: string[] }> {
    return this.http.post<any>(this.apiUrl, user).pipe(
      map((response: { token: string; roles: string[] }) => {
        if (response && response.token && response.roles) {
          this.tokenService.setUserDetails(response.token, response.roles);
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
            firstName: user.nombreUsuario,
            lastName: '',
            email: user.email,
            password: user.password
          };
          console.log('Usuario obtenido del backend:', usuario);
          this.usuarioSubject.next(usuario);
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
