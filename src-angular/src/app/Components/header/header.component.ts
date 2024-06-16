import { Component, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import { Router, RouterModule } from '@angular/router';
import { Usuario } from '../../models/usuario.model';
import { MisDatosComponent } from '../../user/mis-datos/mis-datos.component';
import { MisOpinionesComponent } from '../../user/mis-opiniones/mis-opiniones.component';





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
    RouterModule,
    MisDatosComponent,
    MisOpinionesComponent

  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild('sidenav') sidenav!: MatSidenav; // Referencia al sidenav para controlarlo programáticamente

  isAuthenticated: boolean = false; // Estado de autenticación del usuario
  isAdmin: boolean = false; // Estado de rol de administrador
  usuario: Usuario = new Usuario(0, '', '', '', '', new Set());
  isProfileMenuVisible: boolean = false; // Estado del menú de perfil

  constructor(
    public authService: AuthService,
    private router: Router,
    private tokenService: TokenService,
    @Inject(PLATFORM_ID) private platformId: Object, // Inyección de PLATFORM_ID para verificar el entorno
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.updateAuthenticationState(); // Actualiza el estado de autenticación al cargar el componente
      this.authService.authenticationState.subscribe(() => {
        this.updateAuthenticationState(); // Suscripción para cambios en el estado de autenticación
      });

      // Suscripción para actualizar la información del usuario
      this.authService.usuario$.subscribe((user: Usuario | null) => {
        if (user) {
          this.usuario = user;
        } else {
          this.usuario = new Usuario(0, '', '', '', '', new Set());
        }
        console.log('Usuario actualizado en el componente:', this.usuario);
      });
    }
  }

  updateAuthenticationState() {
    this.isAuthenticated = this.authService.isAuthenticated(); // Verifica si el usuario está autenticado
    if (this.isAuthenticated) {
      this.isAdmin = this.authService.hasRole('ROL_ADMIN'); // Verifica si el usuario tiene rol de administrador
    }
  }

  onLogoutClicked() {
    if (isPlatformBrowser(this.platformId)) {
      // Mostrar alerta de confirmación para cerrar sesión
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
          this.authService.logout(); // Llama al servicio de logout
          Swal.fire('Sesión cerrada', 'Has cerrado sesión correctamente', 'success').then(() => {
            this.router.navigate(['/homeUser']);
            window.location.reload(); // Recarga la página para actualizar el estado
          });
        }
      });
    }
  }

  onLoginClicked() {
    if (this.isAuthenticated) {
      this.onLogoutClicked(); // Si el usuario está autenticado, cerrar sesión
    } else {
      this.router.navigate(['/login']); // Si no está autenticado, navegar al login
    }
  }

  onRegisterClicked() {
    if (this.isAuthenticated) {
      this.router.navigate(['/mis-datos']); // Si el usuario está autenticado, navegar a "mis datos"
    } else {
      this.router.navigate(['/registro']); // Si no está autenticado, navegar al registro
    }
  }

  onProfileClicked() {
    this.isProfileMenuVisible = !this.isProfileMenuVisible; // Alternar visibilidad del menú de perfil
  }

  closeSidenav() {
    this.sidenav.close(); // Cerrar el sidenav
  }
}
