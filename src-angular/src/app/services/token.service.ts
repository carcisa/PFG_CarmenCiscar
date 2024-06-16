import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  // Obtiene el token almacenado en sessionStorage si se ejecuta en el navegador
  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.getItem('token');
    }
    return null;
  }

  // Guarda el token y los roles del usuario en sessionStorage
  setUserDetails(token: string, roles: string[]): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('roles', JSON.stringify(roles));
    }
  }

  // Obtiene los roles del usuario desde sessionStorage
  getRoles(): string[] {
    if (isPlatformBrowser(this.platformId)) {
      const roles = sessionStorage.getItem('roles');
      return roles ? JSON.parse(roles) : [];
    }
    return [];
  }

  // Elimina los detalles del usuario del almacenamiento local
  removeUserDetails(): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem('token');
      localStorage.removeItem('token'); // Eliminación redundante para asegurarse
      sessionStorage.removeItem('roles');
    }
  }

  // Decodifica el token para obtener el correo electrónico del usuario
  getUserEmail(): string | null {
    const token = this.getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica el payload del token
        return payload.email || payload.sub || null; // Retorna el correo electrónico o el subject
      } catch (error) {
        console.error('Error decodificando el token:', error);
        return null;
      }
    }
    return null;
  }
}
