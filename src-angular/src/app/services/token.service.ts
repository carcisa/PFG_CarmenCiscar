import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  getToken(): string | null {
    // Verifica si está en el navegador antes de acceder a sessionStorage
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.getItem('token');
    }
    return null;  // Retorna null o maneja de forma adecuada si no está en un entorno de navegador
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
