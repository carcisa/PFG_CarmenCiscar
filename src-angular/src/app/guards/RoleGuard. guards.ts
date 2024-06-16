import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private tokenService: TokenService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles: string[] = route.data['expectedRoles'];
    // Roles requeridos para la ruta
    const userRoles = this.tokenService.getRoles();
    // Roles del usuario actual

    if (!userRoles) {
      this.router.navigate(['/login']);
      // Redirige al login si no hay roles
      return false;
    }

    const hasRole = userRoles.some(role => expectedRoles.includes(role));
     // Verifica si el usuario tiene alguno de los roles requeridos
    if (!hasRole) {
      this.router.navigate(['/']);
      // Redirige a la página principal si no tiene los roles
      return false;
    }

    return true;
    // Permite el acceso si tiene los roles requeridos
  }
}
