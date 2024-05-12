import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import { Router, RouterModule } from '@angular/router';





@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    CommonModule,
    ButtonComponent,
    RouterModule

  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  isAuthenticated: boolean = false;
  isAdmin: boolean = false;

  constructor(
    public authService: AuthService,
    private router: Router,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    // Verificar el estado de autenticación al cargar el componente y suscribirse a cambios
    this.updateAuthenticationState();
    this.authService.authenticationState.subscribe(() => {
      this.updateAuthenticationState();
    });
  }

  updateAuthenticationState() {
    this.isAuthenticated = this.authService.isAuthenticated();
    if (this.isAuthenticated) {
      this.isAdmin = this.authService.hasRole('ROL_ADMIN');
    }
  }

  onLoginClicked() {
    if (this.isAuthenticated) {
      // Si el usuario está autenticado, realizar logout
      this.onLogoutClicked();
    } else {
      // Si el usuario no está autenticado, redirigir al componente de inicio de sesión
      this.router.navigate(['/login']);
    }
  }

  onLogoutClicked() {
    Swal.fire({
        title: 'Cerrar sesión',
        text: '¿Estás seguro de que deseas cerrar sesión?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, cerrar sesión',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            this.tokenService.removeUserDetails();
            this.authService.logout(); // Notificar al servicio de autenticación que el usuario ha cerrado sesión
            Swal.fire('Sesión cerrada', 'Has cerrado sesión correctamente', 'success').then(() => {
                this.router.navigate(['/homeUser']); // Redirigir a la página de inicio
                window.location.reload();
            });
        }
    });
}

onRegisterClicked(){
  if (this.isAuthenticated) {
    this.router.navigate(['/mi-perfil']);
  } else {
    this.router.navigate(['/registro']);
  }
}


}
