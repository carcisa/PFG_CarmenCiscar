// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { Actividad } from '../../models/actividad.model';
// import { DestinoService } from '../../services/destino.service';
// import { CommonModule } from '@angular/common';
// import { Destino } from '../../models/destino.model';
// import { ButtonComponent } from '../../Components/button/button.component';

// @Component({
//   selector: 'app-planes',
//   standalone: true,
//   imports: [ButtonComponent, CommonModule],
//   templateUrl: './planes.component.html',
//   styleUrls: ['./planes.component.scss']
// })
// export class PlanesComponent implements OnInit {
//   destinos: Destino[] = [];

//   constructor(private destinoService: DestinoService) { }

//   ngOnInit(): void {
//     this.destinoService.getAllDestinos().subscribe({
//       next: (destinos) => this.destinos = destinos,
//       error: (err) => console.error('Error fetching destinos:', err)
//     });
//   }
// }


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private destinoService: DestinoService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log("Destino ID:", params['id']);
      this.destinoId = +params['id'];
      if (this.destinoId) {
        this.loadActividades(this.destinoId);
      } else {
        console.error('ID del destino no definido');
      }
    });
  }

  loadActividades(destinoId: number): void {
    this.destinoService.getActividadesByDestinoId(destinoId).subscribe({
      next: (actividades) => {
        this.actividades = actividades;
        this.opcion1 = this.obtenerActividadesAleatorias();
        this.opcion2 = this.obtenerActividadesAleatorias();
        this.opcion3 = this.obtenerActividadesAleatorias();
      },
      error: (error) => console.error('Error al cargar actividades', error)
    });
  }

  obtenerActividadesAleatorias(): Actividad[] {
    const actividadesTemp = [...this.actividades]; // Copiar la lista de actividades para manipular
    const actividadesFiltradas: Actividad[] = [];
    const categoriasUsadas = new Set<string>();

    while (actividadesFiltradas.length < 3 && actividadesTemp.length > 0) {
      const randomIndex = Math.floor(Math.random() * actividadesTemp.length);
      const actividad = actividadesTemp[randomIndex];

      if (!categoriasUsadas.has(actividad.categoria)) {
        categoriasUsadas.add(actividad.categoria);
        actividadesFiltradas.push(actividad);
        actividadesTemp.splice(randomIndex, 1); // Eliminar para no volver a seleccionarla
      }
    }

    return actividadesFiltradas;
  }
}
