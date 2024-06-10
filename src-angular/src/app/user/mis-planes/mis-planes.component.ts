import { Component, OnInit } from '@angular/core';
import { Actividad } from '../../models/actividad.model';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/usuario.service';
import { TokenService } from '../../services/token.service';
import { Usuario } from '../../models/usuario.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Destino } from '../../models/destino.model';

@Component({
  selector: 'app-mis-planes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mis-planes.component.html',
  styleUrl: './mis-planes.component.scss'
})
export class MisPlanesComponent implements OnInit {
  actividadesFavoritas: Actividad[] = [];
  destino: Destino | null = null;
  actividadesPorDestino: { [key: string]: Actividad[] } = {};
  token: string | null = null;
  usuario: Usuario | null = null;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.token = this.tokenService.getToken();
    this.usuario = this.authService.usuarioSubject.value;
    this.actividadesFavoritas = this.userService.loadActividadesFavoritasFromLocalStorage();

    if (this.token && this.usuario) {
      this.getActividadesFavoritas();
    }
  }

  getActividadesFavoritas(): void {
    if (this.token && this.usuario) {
      this.userService.getActividadesFavoritas(this.token, this.usuario.id)
        .subscribe(
          actividades => {
            this.actividadesFavoritas = actividades || [];
            this.userService.saveActividadesFavoritasToLocalStorage(this.actividadesFavoritas);
          },
          error => {
            console.error('Error al cargar las actividades favoritas', error);
          }
        );
    }
  }

  verDetalleActividad(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate(['/actividad', id]);
    } else {
      console.error('ID de actividad no está definido');
    }
  }

  eliminarActividadFavorita(actividadId: number): void {
    if (this.token && this.usuario) {
      this.userService.removeActividadFavorita(this.token, this.usuario.id, actividadId)
        .subscribe(
          () => {
            this.actividadesFavoritas = this.actividadesFavoritas.filter(actividad => actividad.id !== actividadId);
            this.userService.saveActividadesFavoritasToLocalStorage(this.actividadesFavoritas);
          },
          error => {
            console.error('Error al eliminar la actividad favorita', error);
          }
        );
    }
  }
}
