import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ActividadService } from '../../services/actividad.service';
import { Actividad } from '../../models/actividad.model';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ButtonComponent } from '../../Components/button/button.component';

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
  actividad: Actividad | undefined;
  error: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private actividadService: ActividadService
  ) {}

  ngOnInit(): void {
    this.getActividad();
  }

  getActividad(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
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
  }

  getGoogleMapsLink(direccion: string): string {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(direccion)}`;
  }

  getGoogleSearchLink(nombre: string): string {
    return `https://www.google.com/search?q=${encodeURIComponent(nombre)}`;
  }
}
