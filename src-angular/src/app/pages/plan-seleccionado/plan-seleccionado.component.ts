import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actividad } from '../../models/actividad.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActividadComponent } from '../actividad/actividad.component';
import { PlanStateService } from '../../services/plan-state.service';


@Component({
  selector: 'app-plan-seleccionado',
  standalone: true,
  imports: [CommonModule, RouterModule, ActividadComponent],
  templateUrl: './plan-seleccionado.component.html',
  styleUrls: ['./plan-seleccionado.component.scss']
})
export class PlanSeleccionadoComponent implements OnInit {
  actividades: Actividad[] = [];
  destinoId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private planStateService: PlanStateService
  ) {}

  ngOnInit(): void {
    // Captura el id del destino desde los parámetros de la ruta
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      console.log('Destino ID desde paramMap:', id); // Depuración
      if (id) {
        this.destinoId = +id; // Convierte el id a número
        console.log('Destino ID después de conversión:', this.destinoId); // Depuración
      } else {
        console.error('No se pudo capturar el ID del destino desde los parámetros de la ruta.');
      }
    });

    // Captura las actividades desde los parámetros de la query
    this.route.queryParams.subscribe(params => {
      const actividades = params['actividades'];
      if (actividades) {
        this.actividades = JSON.parse(actividades);// Parsear actividades desde queryParams
        this.planStateService.setActividades(this.actividades);// Guardar en el servicio de estado
      } else {
        this.actividades = this.planStateService.getActividades();// Obtener actividades desde el estado
        if (this.actividades.length === 0) {
          console.error('No se recibieron actividades en la navegación y no hay actividades en el estado');
        }
      }
    });
  }

  goBack(): void {
    // Navegar de regreso a la página de planes del destino
    if (this.destinoId !== undefined && this.destinoId !== null) {
      this.router.navigate([`/destinos/${this.destinoId}/planes`], {
        queryParams: { actividades: JSON.stringify(this.actividades) }
      });
    } else {
      console.error('ID del destino no definido');
    }
  }
}
