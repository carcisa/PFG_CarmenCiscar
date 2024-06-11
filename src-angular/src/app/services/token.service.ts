import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.getItem('token');
    }
    return null;
  }

  setUserDetails(token: string, roles: string[]): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('roles', JSON.stringify(roles));
    }
  }

  getRoles(): string[] {
    if (isPlatformBrowser(this.platformId)) {
      const roles = sessionStorage.getItem('roles');
      return roles ? JSON.parse(roles) : [];
    }
    return [];
  }

  removeUserDetails(): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem('token');
      localStorage.removeItem('token');
      sessionStorage.removeItem('roles');
    }
  }

  getUserEmail(): string | null {
    const token = this.getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.email || payload.sub || null;
      } catch (error) {
        console.error('Error decodificando el token:', error);
        return null;
      }
    }
    return null;
  }
}
