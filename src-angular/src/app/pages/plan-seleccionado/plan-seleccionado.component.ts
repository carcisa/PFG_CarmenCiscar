import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actividad } from '../../models/actividad.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActividadComponent } from '../actividad/actividad.component';

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

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Captura el id del destino desde los parámetros de la ruta
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.destinoId = +id; // Convierte el id a número
      }
    });

    // Captura las actividades desde los parámetros de la query
    this.route.queryParams.subscribe(params => {
      const actividades = params['actividades'];
      if (actividades) {
        this.actividades = JSON.parse(actividades);
      } else {
        console.error('No se recibieron actividades en la navegación');
      }
    });
  }

  goBack(): void {
    // Navega de regreso utilizando el id del destino capturado
    this.router.navigate([`/destinos/${this.destinoId}/planes`]);
  }
}
