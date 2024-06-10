import { Component, OnInit } from '@angular/core';
import { Comentario } from '../../models/comentario.model';
import { AuthService } from '../../services/auth.service';
import { ComentarioService } from '../../services/comentario.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { Actividad } from '../../models/actividad.model';
import { ActividadService } from '../../services/actividad.service';

@Component({
  selector: 'app-mis-opiniones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mis-opiniones.component.html',
  styleUrl: './mis-opiniones.component.scss'
})

export class MisOpinionesComponent implements OnInit {
  comentarios: Comentario[] = [];
  usuarioId: number | null = null;
  actividades: { [key: number]: Actividad } = {}; // Mapeo de actividades por id
  isOpinionModalOpen: boolean = false;
  editMode: boolean = false;
  opinionForm: Partial<Comentario> = {};

  constructor(
    private comentarioService: ComentarioService,
    private authService: AuthService,
    private actividadService: ActividadService
  ) {}

  ngOnInit() {
    this.usuarioId = this.authService.getUsuarioId();
    console.log('Usuario ID:', this.usuarioId);
    if (this.usuarioId !== null) {
      this.loadComentarios();
    }
  }

  loadComentarios() {
    if (this.usuarioId !== null) {
      this.comentarioService.getComentariosPorUsuarioId(this.usuarioId).subscribe(comentarios => {
        this.comentarios = comentarios.reverse(); // Mostrar comentarios en orden inverso
        console.log('Comentarios:', this.comentarios);
        this.loadActividades();
      });
    }
  }

  loadActividades() {
    const actividadObservables = this.comentarios.map(comentario =>
      this.actividadService.getActividadById(comentario.actividadId)
    );

    forkJoin(actividadObservables).subscribe(actividades => {
      actividades.forEach(actividad => {
        this.actividades[actividad.id!] = actividad;
      });
    });
  }

  deleteComentario(id: number) {
    this.comentarioService.deleteComentario(id).subscribe(() => {
      this.loadComentarios();
    });
  }

  getActividadImagen(actividadId: number): string {
    return this.actividades[actividadId]?.imagen || 'ruta/de/imagen/por/defecto.jpg';
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

    if (titulo && rating && message && this.usuarioId) {
      const comentario: Comentario = {
        id: this.opinionForm.id,
        actividadId: this.opinionForm.actividadId!,
        usuarioId: this.usuarioId,
        titulo: titulo,
        puntuacion: parseInt(rating, 10),
        descripcion: message
      };

      if (this.editMode) {
        this.comentarioService.updateComentario(comentario.id!, comentario).subscribe(() => {
          this.closeOpinionModal();
          this.loadComentarios();
        });
      } else {
        this.comentarioService.createComentario(comentario).subscribe(nuevoComentario => {
          this.closeOpinionModal();
          this.loadComentarios();
        });
      }
    }
  }

  editComentario(comentario: Comentario): void {
    this.opinionForm = { ...comentario };
    this.isOpinionModalOpen = true;
    this.editMode = true;
  }
}
