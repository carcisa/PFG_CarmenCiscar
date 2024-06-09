import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ActividadService } from '../../services/actividad.service';
import { Actividad, Categoria } from '../../models/actividad.model';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ButtonComponent } from '../../Components/button/button.component';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/usuario.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-actividad',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonComponent
  ],
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.scss']
})
export class ActividadComponent implements OnInit {
  @Input() actividad?: Actividad;
  error: string | undefined;
  isUserLoggedIn: boolean = false;
  token: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private actividadService: ActividadService,
    private userService: UserService,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isUserLoggedIn = this.authService.isAuthenticated();
    if (this.isUserLoggedIn) {
      this.token = this.tokenService.getToken();
    }
    if (!this.actividad) {
      this.getActividad();
    }
  }

  getActividad(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.actividadService.getActividadById(id)
        .subscribe(
          actividad => {
            this.actividad = actividad;
            this.error = undefined;
          },
          (error: HttpErrorResponse) => {
            console.error('Error al cargar la actividad', error);
            this.actividad = undefined;
            this.error = 'La actividad no existe';
          }
        );
    } else {
      this.error = 'ID de actividad no válido';
    }
  }

  addActividadFavorita(): void {
    if (this.actividad && this.token) {
      const usuarioId = this.authService.getUsuarioId();
      if (usuarioId && this.actividad.id !== undefined) {
        this.userService.addActividadFavorita(this.token, usuarioId, this.actividad.id)
          .subscribe(
            response => {
              console.log('Actividad añadida a favoritos', response);
              this.userService.getActividadesFavoritas(this.token!, usuarioId).subscribe(
                actividades => {
                  this.userService.saveActividadesFavoritasToLocalStorage(actividades);
                  this.router.navigate(['/mis-planes']);
                },
                error => {
                  console.error('Error al cargar las actividades favoritas', error);
                }
              );
            },
            error => {
              console.error('Error al añadir actividad a favoritos', error);
              if (error instanceof HttpErrorResponse) {
                console.error('Error del servidor:', error.message);
              }
            }
          );
      }
    }
  }



  getGoogleMapsLink(direccion: string): string {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(direccion)}`;
  }

  getGoogleSearchLink(nombre: string): string {
    return `https://www.google.com/search?q=${encodeURIComponent(nombre)}`;
  }
}
