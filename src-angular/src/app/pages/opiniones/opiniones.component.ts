import { Component, Input, OnInit } from '@angular/core';
import { Comentario } from '../../models/comentario.model';
import { ComentarioService } from '../../services/comentario.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Actividad } from '../../models/actividad.model';
import { ActividadService } from '../../services/actividad.service';

@Component({
  selector: 'app-opiniones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './opiniones.component.html',
  styleUrl: './opiniones.component.scss'
})
export class OpinionesComponent implements OnInit {
  actividadId: number = 0;
  comentarios: Comentario[] = [];
  actividad?: Actividad;

  constructor(
    private route: ActivatedRoute,
    private comentarioService: ComentarioService,
    private actividadService: ActividadService
  ) {}

  ngOnInit(): void {
    this.actividadId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.actividadId) {
      this.getActividad(this.actividadId);
    }
  }

  getActividad(id: number): void {
    this.actividadService.getActividadById(id).subscribe(
      (actividad) => {
        this.actividad = actividad;
        this.comentarios = actividad.comentarios; // Obtener comentarios del modelo de actividad
      },
      (error) => {
        console.error('Error fetching actividad:', error);
      }
    );
  }
}
