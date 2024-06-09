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
    const userRoles = this.tokenService.getRoles();

    if (!userRoles) {
      this.router.navigate(['/login']);
      return false;
    }

    const hasRole = userRoles.some(role => expectedRoles.includes(role));
    if (!hasRole) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
