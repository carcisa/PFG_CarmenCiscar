import { Component } from '@angular/core';
import { ButtonComponent } from '../../Components/button/button.component';
import { Destino } from '../../models/destino.model';
import { DestinoService } from '../../services/destino.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [ButtonComponent,
    CommonModule,
    FormsModule,


  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {

  destinos: Array<{nombre: string, imagen: string, path: string}> = [];
  destinoBuscado: string = '';

  constructor(private destinoService: DestinoService,
    private router: Router
  ) {
    this.cargarDestinos();
  }
  cargarDestinos(): void {
    this.destinoService.getAllDestinos().subscribe({
      next: (destinos) => {
        this.destinos = destinos.map(destino => ({
          nombre: destino.nombre,
          imagen: destino.imagen,
          path: `/${this.normalizeName(destino.nombre)}`
        }));
      },
      error: (error) => console.error('Error al cargar destinos', error)
    });
  }

  normalizeName(name: string): string {
    return name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }

  buscarDestino() {
    this.destinoService.getDestinoByNombre(this.destinoBuscado).subscribe(destino => {
      if (destino) {
        this.router.navigate(['/destinos', destino.id, 'planes']);
      } else {
        alert('Destino no encontrado');
      }
    }, error => {
      console.error('Error al buscar destino', error);
      alert('Error al buscar destino');
    });
}
}
