import { Injectable } from '@angular/core';

import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private tokenService: TokenService, private router: Router) {}

  //devuelve un booleano que dice si la navegación en ruta esta permitida o no
  //se pasa por parametro la ruta a la que se esta intentando acceder
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const userRoles = this.tokenService.getRoles();

    let isTrue: boolean = true;

    //verifica que los roles sean un array de strings
    if (
      !Array.isArray(userRoles) ||
      userRoles.some((role) => typeof role !== 'string')
    ) {
      this.router.navigate(['/login']);
      return false;
    }

    const isAdmin = userRoles.includes('ROL_ADMIN');
    if (isAdmin) {
      return isTrue;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
