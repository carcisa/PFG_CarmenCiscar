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
import { ComentarioService } from '../../services/comentario.service';
import { Comentario } from '../../models/comentario.model';
import { forkJoin, map } from 'rxjs';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-actividad',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonComponent,
  ],
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.scss']
})
export class ActividadComponent implements OnInit {
  @Input() actividad?: Actividad;
  error: string | undefined;
  isUserLoggedIn: boolean = false;
  isAdmin: boolean = false;
  token: string | null = null;
  isOpinionModalOpen: boolean = false;
  editMode: boolean = false;
  opinionForm: Partial<Comentario> = {};
  mostrarOpiniones: boolean = false;
  comentarios: Comentario[] = [];
  usuarioNombres: { [key: number]: string } = {};

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
    console.log('isUserLoggedIn:', this.isUserLoggedIn);

    this.isAdmin = this.authService.hasRole('ROL_ADMIN');
    console.log('isAdmin:', this.isAdmin);

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

  getImagenUrl(imagen: string | undefined): string {
    return imagen ? `http://localhost:8081/files/${imagen}` : 'ruta/de/imagen/por/defecto.jpg';
  }

  toggleOpiniones(): void {
    this.mostrarOpiniones = !this.mostrarOpiniones;
    if (this.mostrarOpiniones && this.actividad) {
      this.getComentariosPorActividadId(this.actividad.id!);
    }
  }

  getComentariosPorActividadId(id: number): void {
    this.comentarioService.getComentariosPorActividadId(id).subscribe(
      comentarios => {
        this.comentarios = comentarios;
        this.addUsuarioNamesToComentarios();
      },
      error => console.error('Error fetching comentarios:', error)
    );
  }

  addUsuarioNamesToComentarios(): void {
    const observables = this.comentarios.map(comentario =>
      this.userService.getUsers(this.token!).pipe(
        map(users => {
          const user = users.find((user: Usuario) => user.id === comentario.usuarioId);
          if (user) {
            this.usuarioNombres[comentario.usuarioId] = user.nombreUsuario;
          } else {
            this.usuarioNombres[comentario.usuarioId] = 'Desconocido';
          }
          return comentario;
        })
      )
    );

    forkJoin(observables).subscribe(
      () => {
        // No necesitamos hacer nada aquí porque el mapa se actualiza dentro del observable
      },
      error => console.error('Error fetching usuario names:', error)
    );
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

  redirectToOpiniones(): void {
    if (this.actividad) {
      this.router.navigate(['/opiniones', this.actividad.id]);
    }
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

  deleteActividad(): void {
    if (this.actividad && this.actividad.id) {
      this.actividadService.deleteActividad(this.actividad.id).subscribe({
        next: () => {
          console.log('Actividad eliminada');
          this.router.navigate(['/actividades']);
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error eliminando actividad', error);
          alert(`Error eliminando actividad: ${error.message}`);
        }
      });
    }
  }

  getGoogleMapsLink(direccion: string): string {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(direccion)}`;
  }

  getGoogleSearchLink(nombre: string): string {
    return `https://www.google.com/search?q=${encodeURIComponent(nombre)}`;
  }
}
