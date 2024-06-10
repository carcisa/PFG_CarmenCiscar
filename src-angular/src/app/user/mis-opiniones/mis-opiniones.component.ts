import { Component, OnInit } from '@angular/core';
import { Comentario } from '../../models/comentario.model';
import { AuthService } from '../../services/auth.service';
import { ComentarioService } from '../../services/comentario.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';

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

  constructor(
    private comentarioService: ComentarioService,
    private authService: AuthService
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
        this.comentarios = comentarios;
        console.log('Comentarios:', this.comentarios);
      });
    }
  }

  deleteComentario(id: number) {
    this.comentarioService.deleteComentario(id).subscribe(() => {
      this.loadComentarios();
    });
  }

  createComentario(comentario: Comentario) {
    this.comentarioService.createComentario(comentario).subscribe(() => {
      this.loadComentarios();
    });
  }

  updateComentario(id: number, comentario: Comentario) {
    this.comentarioService.updateComentario(id, comentario).subscribe(() => {
      this.loadComentarios();
    });
  }
}
