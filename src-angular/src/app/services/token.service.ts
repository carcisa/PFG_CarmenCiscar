import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  //devuelve el token almacenado en la session, si no hay retorna null
  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  //recibe un token y un array de roles
  setUserDetails(token: string, roles: string[]): void {
    //y lo almacena en la sesión
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('roles', JSON.stringify(roles));
  }

  //obtiene los roles almacenados en la sesión
  getRoles(): string[] | null {
    //recupera los roles
    const roles = sessionStorage.getItem('roles');
    //los parsea y los devuelve como un array
    return roles ? JSON.parse(roles) : null;
  }

  //elimina el token y los roles
  removeUserDetails(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('roles');
  }

}
