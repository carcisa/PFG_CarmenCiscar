import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actividad } from '../../models/actividad.model';
import { DestinoService } from '../../services/destino.service';
import { CommonModule } from '@angular/common';
import { Destino } from '../../models/destino.model';
import { ButtonComponent } from '../../Components/button/button.component';

@Component({
  selector: 'app-planes',
  standalone: true,
  imports: [ButtonComponent, CommonModule],
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.scss']
})
export class PlanesComponent implements OnInit {
  actividades: Actividad[] = [];
  opcion1: Actividad[] = [];
  opcion2: Actividad[] = [];
  opcion3: Actividad[] = [];
  destinoId!: number;
  destino?: Destino;

  constructor(private destinoService: DestinoService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Captura el ID del destino desde los parámetros de la ruta
    this.route.params.subscribe(params => {
      console.log("Destino ID:", params['id']);
      this.destinoId = +params['id'];
      if (this.destinoId) {
        this.loadActividades(this.destinoId); // Cargar actividades basadas en el ID del destino
      } else {
        console.error('ID del destino no definido');
      }
    });
  }

  loadActividades(destinoId: number): void {
    // Obtener actividades por ID del destino desde el servicio
    this.destinoService.getActividadesByDestinoId(destinoId).subscribe({
      next: (actividades) => {
        this.actividades = actividades;
        // Generar opciones de actividades aleatorias
        this.opcion1 = this.obtenerActividadesAleatorias();
        this.opcion2 = this.obtenerActividadesAleatorias();
        this.opcion3 = this.obtenerActividadesAleatorias();
      },
      error: (error) => console.error('Error al cargar actividades', error)
    });
  }

  obtenerActividadesAleatorias(): Actividad[] {
    const actividadesTemp = [...this.actividades]; // Copia temporal de las actividades
    const actividadesFiltradas: Actividad[] = []; // Actividades filtradas
    const categoriasUsadas = new Set<string>(); // Categorías usadas para evitar duplicados

    // Seleccionar dos actividades con diferentes categorías excluyendo "GASTRONOMIA"
    while (actividadesFiltradas.length < 2 && actividadesTemp.length > 0) {
      const randomIndex = Math.floor(Math.random() * actividadesTemp.length);
      const actividad = actividadesTemp[randomIndex];

      if (!categoriasUsadas.has(actividad.categoria) && actividad.categoria !== 'GASTRONOMIA') {
        categoriasUsadas.add(actividad.categoria);
        actividadesFiltradas.push(actividad);
        actividadesTemp.splice(randomIndex, 1); // Eliminar actividad seleccionada
      }
    }

    // Añadir una actividad de "GASTRONOMIA" si existe
    const actividadesGastronomia = actividadesTemp.filter(actividad => actividad.categoria === 'GASTRONOMIA');
    if (actividadesGastronomia.length > 0) {
      const randomIndexGastronomia = Math.floor(Math.random() * actividadesGastronomia.length);
      actividadesFiltradas.push(actividadesGastronomia[randomIndexGastronomia]);
    } else {
      console.error('No se encontró una actividad de la categoría "gastronomía"');
    }

    return actividadesFiltradas;
  }

  seleccionarPlan(actividades: Actividad[]): void {
    // Navegar a la página del plan seleccionado con las actividades seleccionadas como parámetros de consulta
    this.router.navigate(['/planSeleccionado', this.destinoId], {
      queryParams: { actividades: JSON.stringify(actividades) }
    });
  }
}
