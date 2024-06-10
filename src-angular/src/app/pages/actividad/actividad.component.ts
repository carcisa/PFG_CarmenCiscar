import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ActividadService } from '../../services/actividad.service';
import { Actividad, Categoria } from '../../models/actividad.model';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ButtonComponent } from '../../Components/button/button.component';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/usuario.service';
import { TokenService } from '../../services/token.service';
import { FormOpinionComponent } from '../../user/form-opinion/form-opinion.component';
import { ComentarioService } from '../../services/comentario.service';
import { Comentario } from '../../models/comentario.model';

@Component({
  selector: 'app-actividad',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonComponent,
    FormOpinionComponent
  ],
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.scss']
})
export class ActividadComponent implements OnInit {
  @Input() actividad?: Actividad;
  error: string | undefined;
  isUserLoggedIn: boolean = false;
  token: string | null = null;
  isOpinionModalOpen: boolean = false;
  editMode: boolean = false;
  opinionForm: Partial<Comentario> = {};

  constructor(
    private route: ActivatedRoute,
    private actividadService: ActividadService,
    private userService: UserService,
    private authService: AuthService,
    private tokenService: TokenService,
    private comentarioService: ComentarioService,
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

  openOpinionModal(): void {
    this.isOpinionModalOpen = true;
    this.editMode = false;
    this.opinionForm = {};
  }

  closeOpinionModal(): void {
    this.isOpinionModalOpen = false;
  }

  submitOpinion(event: Event): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const titulo = (form.querySelector('#titulo') as HTMLInputElement).value;
    const rating = (form.querySelector('input[name="rating"]:checked') as HTMLInputElement)?.value;
    const message = (form.querySelector('#message') as HTMLTextAreaElement)?.value;

    if (titulo && rating && message && this.actividad && this.token) {
      const comentario: Comentario = {
        id: this.opinionForm.id,
        actividadId: this.actividad.id!,
        usuarioId: this.authService.getUsuarioId()!,
        titulo: titulo,
        puntuacion: parseInt(rating, 10),
        descripcion: message
      };

      if (this.editMode) {
        this.comentarioService.updateComentario(comentario.id!, comentario).subscribe(() => {
          this.closeOpinionModal();
          // Recargar la página de opiniones
          this.router.navigate(['/mis-opiniones']);
        });
      } else {
        this.comentarioService.createComentario(comentario).subscribe(nuevoComentario => {
          this.closeOpinionModal();
          // Recargar la página de opiniones
          this.router.navigate(['/mis-opiniones']);
        });
      }
    }
  }

  editComentario(comentario: Comentario): void {
    this.opinionForm = { ...comentario };
    this.isOpinionModalOpen = true;
    this.editMode = true;
  }

  getGoogleMapsLink(direccion: string): string {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(direccion)}`;
  }

  getGoogleSearchLink(nombre: string): string {
    return `https://www.google.com/search?q=${encodeURIComponent(nombre)}`;
  }
}
